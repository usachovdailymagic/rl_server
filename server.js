//----------------Value constants---------------------
var CONST_MAX_FRIENDS_COUNT_SCORES_TO_QUERY 			= 5; //Max friend's scores to receive per one request
//----------------End Value constants---------------------

//----------------Server keys constants---------------------
var CONST_KEY_SERVER_FIELD_GAME_PROGRESS				= "Progress";
var CONST_KEY_SERVER_FIELD_SAVE_OVERVIEW				= "SaveOverview";
var CONST_KEY_SERVER_FIELD_UUID        					= "Uuid";
var CONST_KEY_SERVER_FIELD_SCORE        				= "Score";
var CONST_KEY_SERVER_FIELD_GIFTS_RECEIVED				= "GiftsReceived";
var CONST_KEY_SERVER_FIELD_GIFTS_SENT_TIMESTAMP			= "GiftsSentTime";
//----------------End Server keys constants---------------------

//----------------Errors---------------------
// 1XXX Errors for Load Save Reset operations
var CONST_ERROR_CODE_LOADPROGRESS_NOT_FOUND_USERDATA	            = 1001;

// 2XXX Errors for System additional operations
var CONST_ERROR_CODE_GET_CUSTOM_ID_NOT_FOUND_UUID 		            = 2001;

// 3XXX Errors for FB interaction operations
var CONST_ERROR_CODE_FRIEND_PROGRESS_NOT_FOUND	 		            = 3001;
var CONST_ERROR_CODE_FRIEND_PROGRESS_AT_GIFTS_SENDING_NOT_FOUND	 	= 3002;
var CONST_ERROR_CODE_BAD_PARAMS_AT_GIFTS_SENDING            	 	= 3003;
//----------------End Errors---------------------
// -----------------------------------------------------------------
function isObject(val) {
    return val instanceof Object; 
}
//------------------------------------------------------------------ 
function isArray(val) {
    return val instanceof Array; 
}
//------------------------------------------------------------------
function getSeverTimestamp() {
    var now = new Date();
    var time = now.getTime();

    return time;
}
// Represents Gift class.
function cGift(sender, itemType, amount, uid)
{
    constructor (sender, itemType, amount, uid)
    {
        this.mSender = sender;
        this.mItemType = itemType;
        this.mAmount = amount;
        this.mId = uid;

        if ( uid == -1 )
        {
            this.mId = GenerateId( this.mSender );
        }
    }
//public
    this.GetSaveObject = function()
    {
        return {"sender":this.mSender
            , "itemType":this.mItemType
            , "amount":this.mAmount
            , "id": this.mId};
    }
//private
    function GenerateId( sender )
    {
        var tmstmp = getSeverTimestamp();
        return (tmstmp.toString() + "_S_" + sender);
    }
}

//------------------------------------------------------------------
// Adds new gift for existing. Params:
// gifts - array of old gifts
// new_gift - cGift new element
// returns New generated array of gifts
function addNewGiftToExisting( gifts, new_gift ) {
    if ( !isArray( gifts ) )
    {
        gifts = [];
    }

    gifts.push( new_gift.GetSaveObject() );

    return gifts;
}

handlers.getServerTime = function(args) {
	var time = getSeverTimestamp();
    return { serverTime: time };
}

//sending gift to friend
//input: friendFbId, senderFbId, item - type of resource to gift, count - count of resources
handlers.sendFriendGift = function(args) {
    var result = [];
    if ( isObject( args ) && ( "friendFbId" in args )  && ( "senderFbId" in args ) && ( "itemType" in args ) && ( "count" in args ) )
    {
        var FriendsIds = [];
        var IncomingGift = new cGift( args["senderFbId"], args["itemType"], args["count"], -1 );
        FriendsIds = [args["friendFbId"]];



        var data = server.GetPlayFabIDsFromFacebookIDs({
            FacebookIDs: FriendsIds
// 	FacebookIDs:["271802446516803","621807987996023"]
        });

        if ( isObject( data ) && ( "Data" in data ) && ( isArray( data["Data"] ) ) )
        {
            var ids = data["Data"];
            var CountFriends = ids.length;

            for (var i = 0; i < CountFriends; i++) {
                if ( isObject( ids[i] ) && ( "FacebookId" in ids[i] ) && ( "PlayFabId" in ids[i] ) )
                {
                    var GiftsData = server.GetUserData({
                        PlayFabId: ids[i]["PlayFabId"],
                        Keys: [CONST_KEY_SERVER_FIELD_GIFTS_RECEIVED]
                    });
                    var AllGifts = [];
                    GiftElement = {FacebookId:ids[i]["FacebookId"]};
                    GiftElement["PlayFabId"] = ids[i]["PlayFabId"];
                    GiftElement["GiftResult"] = false;
                    if ( isObject( GiftsData )
                        && ( "Data" in GiftsData )
                        && ( CONST_KEY_SERVER_FIELD_GIFTS_RECEIVED in GiftsData.Data )
                        && ( "Value" in GiftsData.Data[CONST_KEY_SERVER_FIELD_GIFTS_RECEIVED] ) )
                    {
//                    GiftElement["GiftsData"] =
                        AllGifts = JSON.parse(GiftsData.Data[CONST_KEY_SERVER_FIELD_GIFTS_RECEIVED].Value);
                    }
                    GiftElement["TestClass"] = [];
                    AllGifts = addNewGiftToExisting(AllGifts,IncomingGift);
                    GiftElement["TestClass"] = AllGifts;
                    result.push( GiftElement );

                    var UpdateGiftsData = {};
                    UpdateGiftsData[CONST_KEY_SERVER_FIELD_GIFTS_RECEIVED] = AllGifts;

                    var resp = server.UpdateUserData({
                        PlayFabId: ids[i]["PlayFabId"],
                        Data: UpdateGiftsData
                    });

                    log.info("RESPONSE = "+JSON.stringify(resp));
                }
            };
        }
        else
        {
            result = {code:CONST_ERROR_CODE_FRIEND_PROGRESS_AT_GIFTS_SENDING_NOT_FOUND, msg: "Bad response at sendFriendGift"};
        }
    }
    else
    {
        result = {code:CONST_ERROR_CODE_BAD_PARAMS_AT_GIFTS_SENDING, msg: "Bad request data at sendFriendGift"};
    }

    return {result: result};
};
 
//get friends progress
//input: array if strings FacebokIds
handlers.getFriendsProgress = function(args) {
	var ClientIds = [];
	if ( isObject( args ) && ( "ids" in args ) && isArray( args["ids"] ) )
	{
		ClientIds = args["ids"];
	}
	
	var data = server.GetPlayFabIDsFromFacebookIDs({
		FacebookIDs: ClientIds
// 	FacebookIDs:["271802446516803","621807987996023"]
	});

	var result = [];

	if ( isObject( data ) && ( "Data" in data ) && ( isArray( data["Data"] ) ) )
	{
		var ids = data["Data"];
		var CountFriends = Math.min( ids.length, CONST_MAX_FRIENDS_COUNT_SCORES_TO_QUERY );
		
		for (var i = 0; i < CountFriends; i++) {
			if ( isObject( ids[i] ) && ( "FacebookId" in ids[i] ) && ( "PlayFabId" in ids[i] ) )
			{
				var ScoreData = server.GetUserData({
						PlayFabId: ids[i]["PlayFabId"],
						Keys: [CONST_KEY_SERVER_FIELD_SCORE]
					});
				
				FriendElement = {FacebookId:ids[i]["FacebookId"]};
				FriendElement["PlayFabId"] = ids[i]["PlayFabId"];
				FriendElement["score"] = [];
				if ( isObject( ScoreData ) 
					&& ( "Data" in ScoreData ) 
					&& ( CONST_KEY_SERVER_FIELD_SCORE in ScoreData.Data )
					&& ( "Value" in ScoreData.Data[CONST_KEY_SERVER_FIELD_SCORE] ) )
				{
					FriendElement["score"] = JSON.parse(ScoreData.Data[CONST_KEY_SERVER_FIELD_SCORE].Value);
				}
				result.push( FriendElement );
			}
		};
	}
	else
	{
		result = {code:CONST_ERROR_CODE_FRIEND_PROGRESS_NOT_FOUND, msg: "Bad response at getFriendsProgress"};		
	}
	
	return {result: result};
};

//get custom id. Which means our uuid of app on the device
//input: isFbAcc - means from what auth scheme asking for a Uuid. Needed in client, just resendind it back for now.
handlers.getCustomId = function(args) {

	var result = {"isFbAcc":false};
	var data = server.GetUserData({
		PlayFabId: currentPlayerId,
			Keys: [CONST_KEY_SERVER_FIELD_UUID]
	});
	
	if ( isObject(args) && ( "isFbAcc" in args ) )
	{
		result.isFbAcc = args.isFbAcc;
	}
	
	if ( isObject( data ) && ( "Data" in data ) && ( CONST_KEY_SERVER_FIELD_UUID in data.Data ) && ( "Value" in data.Data[CONST_KEY_SERVER_FIELD_UUID] ) )
	{
		result[CONST_KEY_SERVER_FIELD_UUID] = data.Data[CONST_KEY_SERVER_FIELD_UUID].Value;
	}
	else
	{
		result = {"message":"Uuid not found","code":CONST_ERROR_CODE_GET_CUSTOM_ID_NOT_FOUND_UUID};	
	}	

	return result;
};
 
//reset user progress
//input: none
handlers.resetProgress = function(args) {

    var ResetData = {};
    ResetData[CONST_KEY_SERVER_FIELD_GAME_PROGRESS] = null;
    ResetData[CONST_KEY_SERVER_FIELD_SCORE] = null;

	server.UpdateUserData({
		PlayFabId: currentPlayerId,
		Data: ResetData
	});
};
 
//save my progress, new version
//input: key for saved game and save data
handlers.saveMyProgress = function(args) {
    var gameData = args.gamedata;

    var userData = server.GetUserData({
    	PlayFabId: currentPlayerId,
        Keys: [CONST_KEY_SERVER_FIELD_GAME_PROGRESS]
    });
    
    var SaveGame = [];
    
    if( CONST_KEY_SERVER_FIELD_GAME_PROGRESS in userData.Data )
    {
    	if( "Value" in userData.Data[CONST_KEY_SERVER_FIELD_GAME_PROGRESS] )
    	{
    		SaveGame = JSON.parse(userData.Data[CONST_KEY_SERVER_FIELD_GAME_PROGRESS].Value);
    	}
    }
    
    var myJSONArray = [ {info:{}}, {map:{}}, {vault:{}}, {creatures:{}}, {shop:{}}, {quests_tasks:{}}, {scores:{}}, {gameflagsparams:{}}, {battleinfo:{}}, {task_timers:{}}, {tutorial:{}}, {chest_shop:{}}];
    var missedArray = [];
     
    if (myJSONArray.length!=SaveGame.length) {
        for(var i = 0; i < myJSONArray.length; i++) { 
            var obj = myJSONArray[i];
            for (var property in obj) {
                var found = false;
                 
                for (var j = 0; j<SaveGame.length; j++) {
                    var obj3 = SaveGame[j];
                     
                    for (var propertyinSaveGame in obj3) {
                        if (property==propertyinSaveGame) {
                            found = true;
                            break;
                        }
                    }
                    if (found)
                        break;
                }
                if (!found) {
                    missedArray.push(myJSONArray[i]);
                }
            }
        }
         
        for(var i = 0; i < missedArray.length; i++) {
            SaveGame.push(missedArray[i]);
        }
    }
    
    var uuid_to_save = "";
    var SaveOverview = null;
    var ScoreData = null;
    
    for (var i = 0; i < gameData.length; i++) {
        var obj = gameData[i];
        for (var property in obj)
        {
            if ( property == "scores" )
            {
            	var scoreData = obj["scores"].levelsScores;
            	ScoreData = JSON.stringify(scoreData);
            }
            else if ( property == "saveoverview" )
            {
            	SaveOverview = JSON.stringify(obj["saveoverview"]);
            }
            else if ( property == "info" && isObject(obj[property]) && ( "uuid" in obj[property] ) ) // searching uuid to save
            {
            	uuid_to_save = obj[property]["uuid"];
            }
            for (var j = 0; j < SaveGame.length; j++)
            {
                var obj2 = SaveGame[j];
                for (var propertySaveGame in obj2)
                {
                    var lfound = false;
                     
                    if (property==propertySaveGame)
                    {
                        SaveGame[j] = gameData[i];
                        lfound = true;
                        break;
                    }
                    if (lfound)
                        break;
                }
            }
        }
    }

    var json = JSON.stringify(SaveGame);

    var SaveObject = {};

    SaveObject[CONST_KEY_SERVER_FIELD_GAME_PROGRESS] = json;
    SaveObject[CONST_KEY_SERVER_FIELD_UUID] = uuid_to_save;
    
    if ( ScoreData != null )
    {
    	SaveObject[CONST_KEY_SERVER_FIELD_SCORE] = ScoreData;
    }
    if ( SaveOverview != null )
    {
    	SaveObject[CONST_KEY_SERVER_FIELD_SAVE_OVERVIEW] = SaveOverview;
    }

    server.UpdateUserData({
		PlayFabId: currentPlayerId,
		Data: SaveObject
	});
};
 
//input: none
handlers.getShop = function(args) {

    var shopData = server.GetTitleData({
    	Keys: ["shop"]
    });

    var data = shopData.Data["shop"];

    return { result: data };
};
 
//load my progress, new version
//input: key for save game object
handlers.loadMyProgress = function(args) {

    response = {"message":"Unknown error"};

    var currentProgress = server.GetUserData({
        PlayFabId: currentPlayerId,
        Keys: [CONST_KEY_SERVER_FIELD_GAME_PROGRESS, CONST_KEY_SERVER_FIELD_SAVE_OVERVIEW, CONST_KEY_SERVER_FIELD_GIFTS_RECEIVED, CONST_KEY_SERVER_FIELD_GIFTS_SENT_TIMESTAMP]
    });

	var gameDataKeys = args.gamedatakeys;
    var data = currentProgress.Data[CONST_KEY_SERVER_FIELD_GAME_PROGRESS];
	if (data) {
		/*jsonarray = [];
		for(var i = 0; i < data.length; i++) {
			var obj = data[i];
			for (var property in obj)
			{
				for(var j = 0; j < gameDataKeys.length; j++) {
					if (gameDataKeys[j]==property)
						jsonarray.push(data[i]);
				}
			}
		}*/

		response = { result:{} };
		
		if( "Value" in data ) {
		    response.result["progress"] = JSON.parse(data.Value);
		}
		

	    if( CONST_KEY_SERVER_FIELD_SAVE_OVERVIEW in currentProgress.Data )
	    {
		    var overview = currentProgress.Data[CONST_KEY_SERVER_FIELD_SAVE_OVERVIEW];
		    if ( overview && ( "Value" in overview ))
		    {
		    	response.result["overview"] = JSON.parse(overview.Value);
		    }
	    }

        if( CONST_KEY_SERVER_FIELD_GIFTS_RECEIVED in currentProgress.Data )
        {
            var gifts = currentProgress.Data[CONST_KEY_SERVER_FIELD_GIFTS_RECEIVED];
            if ( gifts && ( "Value" in gifts ))
            {
                response.result["gifts"] = JSON.parse(gifts.Value);
            }
        }

        if( CONST_KEY_SERVER_FIELD_GIFTS_SENT_TIMESTAMP in currentProgress.Data )
        {
            var gift_timers = currentProgress.Data[CONST_KEY_SERVER_FIELD_GIFTS_SENT_TIMESTAMP];
            if ( gift_timers && ( "Value" in gift_timers ))
            {
                response.result["gift_timers"] = JSON.parse(gift_timers.Value);
            }
        }
	}
	else {
	    response = {"message":"Save or key not found","code":CONST_ERROR_CODE_LOADPROGRESS_NOT_FOUND_USERDATA};
	}

	return response;
};
 
//Redeem Promo Code
//input: code
handlers.redeemPromoCode = function(args) {
    /*Parse.Cloud.useMasterKey();
     
    var currentCode = Parse.Object.extend("Codes");
    var query = new Parse.Query(currentCode);
    var user = request.user; //
    var inputCode = request.params.code;
    //console.log(gameDataKeys);
     
    responseObj = {"message":"Unknown error"};
    query.equalTo("codeID", inputCode);
    query.equalTo("active", true);
     
    query.find ({
    success: function(result) {
        if ((result.length > 0)) {
             
            codeData = result[0].get("codeData");
            activationCount = result[0].get("activationCount");
            if (codeData)
            {
                responseObj = codeData;
                result[0].set("activationCount",activationCount+1);
                result[0].save();
                response.success(responseObj);
            }
            else
            {
                //console.log("No save games");
                responseObj = {"message":"Code not found or already redeemed"};
                response.success(responseObj);
            }
        }
        else {
            responseObj = {"message":"Code not found"};
            response.success(responseObj);
        }
         
    },
    error: function() {
        responseObj = {"message":"Code not found"};
        response.success(responseObj);
    }
        });*/
};


handlers.getPlayerStats = function(args) {
	var leaderboard =  server.GetLeaderboardAroundUser({
		StatisticName: "PvP Raiting",
		PlayFabId: currentPlayerId,
		MaxResultsCount: 3
	});

	var rank = 0;
	var rate = 1;

	if ( isObject( leaderboard ) && ( "Leaderboard" in leaderboard ) )
	{
		for (var i = 0; i < leaderboard.Leaderboard.length; i++) {
			var player = leaderboard.Leaderboard[i];
			if (player.PlayFabId == currentPlayerId) {
				rank = player.Position + 1;
				rate = player.StatValue;
				break;
			}
		}
	}

	return { "playerRank": rank, "playerRate": rate };
}

handlers.updatePlayerStats = function(args) {
	var rate = args.player.rate;
	server.UpdatePlayerStatistics({
		PlayFabId: currentPlayerId,
		Statistics: [{
			"StatisticName": "PvP Raiting",
			"Value": rate
		}]
	});

	var leaderboard =  server.GetLeaderboardAroundUser({
		StatisticName: "PvP Raiting",
		PlayFabId: currentPlayerId,
		MaxResultsCount: 3
	});

	var rank = 0;

	if ( isObject( leaderboard ) && ( "Leaderboard" in leaderboard ) )
	{
		for (var i = 0; i < leaderboard.Leaderboard.length; i++) {
			var player = leaderboard.Leaderboard[i];
			if (player.PlayFabId == currentPlayerId) {
				rank = player.Position + 1;
				break;
			}
		}
	}

	return { "playerRank": rank };
}

handlers.getPvpPlayers = function(args) {
	var leaderboard =  server.GetLeaderboardAroundUser({
		StatisticName: "PvP Raiting",
		PlayFabId: currentPlayerId,
		MaxResultsCount: 4
	});


	var players = [];

	if ( isObject( leaderboard ) && ( "Leaderboard" in leaderboard ) )
	{
		for (var i = 0; i < leaderboard.Leaderboard.length; i++) {
			var player = leaderboard.Leaderboard[i];
			if (player.PlayFabId == currentPlayerId) {
				continue;
			}

			var currentProgress = server.GetUserData({
			    PlayFabId: player.PlayFabId,
				Keys: [CONST_KEY_SERVER_FIELD_GAME_PROGRESS]
			});

			var data = currentProgress.Data[CONST_KEY_SERVER_FIELD_GAME_PROGRESS];

			var progress = {};
			
			if( "Value" in data ) {
				progress = JSON.parse(data.Value);
			}

			var heroes = [];

			if (progress) {
				for (var j = 0; j < progress.length; j++)
				{
					var obj = progress[j];
					if ( ("creatures" in obj) ) {
						if ("heroes" in obj.creatures) {
							heroes = obj.creatures.heroes;
						}
						break;
					}
				}
			}

			var playerRank = player["Position"] + 1;

			var pl = { name: player["DisplayName"], rank: playerRank, rate: player["StatValue"], heroes: heroes };
			players.push(pl);
		}
	}

	return { result: { "players": players } };
}
