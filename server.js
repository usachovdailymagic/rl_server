//----------------Value constants---------------------
var CONST_MAX_FRIENDS_COUNT_SCORES_TO_QUERY 			= 5; //Max friend's scores to receive per one request
//var CONST_SEND_FRIEND_GIFT_TIME_INTERVAL     			= 86400; //Time between gift sending to the same friend
var CONST_SEND_FRIEND_GIFT_TIME_INTERVAL     			= 45; //Time between gift sending to the same friend
var CONST_USE_SERVER_TIMESTAMPS_IN_SECONDS     			= true; //Cast server timestamp to seconds
var CONST_ADD_CONSTANTS_TO_RESPONSE_AT_LOAD_PROGRESS    = true; //Add server constants at loadMyProgress
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
var CONST_ERROR_CODE_TOO_EARLY_TO_SEND_THIS_FRIEND            	 	= 3004;
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
function getServerTimestamp() {
    var now = new Date();
    var time = now.getTime();
//  Get timestamp in seconds
    if ( CONST_USE_SERVER_TIMESTAMPS_IN_SECONDS )
    {
        time = Math.floor(time / 1000);
    }

    return time;
}
//------------------------------------------------------------------
function getServerConstantsObject() {
    var Constants = {};
    Constants["giftInterval"] = CONST_SEND_FRIEND_GIFT_TIME_INTERVAL;

    return Constants;
}
//------------------------------------------------------------------
function getError(code, msg) {
    return {code:code, msg: msg};
}
//-----------------------------------------------------------------
// Represents Gift class.
function cGift(sender, networkType, itemType, amount, uid)
{
    this.mSender = sender;
    this.mNetworkType = networkType;
    this.mItemType = itemType;
    this.mAmount = amount;
    this.mId = uid;

    if ( uid == -1 )
    {
        this.mId = GenerateId( this.mSender );
    }

//public
    this.GetSaveObject = function()
    {
        return {"sender":this.mSender
            , "networkType":this.mNetworkType
            , "itemType":this.mItemType
            , "amount":this.mAmount
            , "id": this.mId};
    }
//private
    function GenerateId( sender )
    {
        var tmstmp = getServerTimestamp();
        return (tmstmp.toString() + "_S_" + sender);
    }
}
//-----------------------------------------------------------------
/***************
Represents User class.
Contains part of logic, some things are in handler methods without use of cUser
 **************/
function cUser(playFabId, facebookId, uuid)
{
//---public members---
    this.mPlayFabId = playFabId;
    this.mFacebookId = facebookId;
    this.mUuid = uuid;
    this.mDbFields = {};

    this.mDbFields[CONST_KEY_SERVER_FIELD_GAME_PROGRESS]				= [];
    this.mDbFields[CONST_KEY_SERVER_FIELD_SAVE_OVERVIEW]				= {};
    this.mDbFields[CONST_KEY_SERVER_FIELD_UUID]        					= "";
    this.mDbFields[CONST_KEY_SERVER_FIELD_SCORE]        				= [];
    this.mDbFields[CONST_KEY_SERVER_FIELD_GIFTS_RECEIVED]				= [];
    this.mDbFields[CONST_KEY_SERVER_FIELD_GIFTS_SENT_TIMESTAMP]			= {};
//---private members---
    var mDbFieldsInitedSuccessfully = false;

//---public methods---
//--------------------------------------------
    this.readDbFields = function(keys)
    {
        if ( isArray(keys) )
        {
            var Data = server.GetUserData({
                PlayFabId: this.mPlayFabId,
                Keys: keys
            });

            if ( isObject( Data ) && ( "Data" in Data ) )
            {
                SetDbInited(true);

                var Len = keys.length;
                for ( var i = 0; i < Len; ++i )
                {
                    var Key = keys[i];

                    if ( ( Key in Data.Data ) && ( "Value" in Data.Data[Key] ) )
                    {
                        var ParseResult = Data.Data[Key].Value;
                        if ( Key != "Uuid" )
                        {
                            ParseResult = JSON.parse(ParseResult);
                        }
                        this.mDbFields[Key] = ParseResult;
                    }
                }
            }
            else
            {
                SetDbInited(false);
            }
        }
    }
//--------------------------------------------
    this.saveDbFields = function(keys)
    {
        if ( isArray(keys) )
        {
            var KeysToSave = {};

            var Len = keys.length;
            for ( var i = 0; i < Len; ++i )
            {
                var Key = keys[i];

                if ( isObject(this.mDbFields[Key]) || isArray(this.mDbFields[Key]) )
                {
                    KeysToSave[Key] = JSON.stringify(this.mDbFields[Key]);
                }
                else
                {
                    KeysToSave[Key] = this.mDbFields[Key];
                }
            }

            var resp = server.UpdateUserData({
                PlayFabId: this.mPlayFabId,
                Data: KeysToSave
            });
        }
    }
//--------------------------------------------
    this.getGiftsCount = function()
    {
        if ( isArray(this.mDbFields[CONST_KEY_SERVER_FIELD_GIFTS_RECEIVED]) )
        {
            return this.mDbFields[CONST_KEY_SERVER_FIELD_GIFTS_RECEIVED].length;
        }

        return 0;
    }
//--------------------------------------------
    this.addNewGift = function(gift)
    {
        if ( !isArray(this.mDbFields[CONST_KEY_SERVER_FIELD_GIFTS_RECEIVED]) )
        {
            this.mDbFields[CONST_KEY_SERVER_FIELD_GIFTS_RECEIVED] = [];
        }
        this.mDbFields[CONST_KEY_SERVER_FIELD_GIFTS_RECEIVED].push(gift.GetSaveObject());
    }
//--------------------------------------------
    this.recalcSendTimer = function(friendFbId)
    {
        if ( !isObject(this.mDbFields[CONST_KEY_SERVER_FIELD_GIFTS_SENT_TIMESTAMP]) )
        {
            this.mDbFields[CONST_KEY_SERVER_FIELD_GIFTS_SENT_TIMESTAMP] = {};
        }
        this.mDbFields[CONST_KEY_SERVER_FIELD_GIFTS_SENT_TIMESTAMP][friendFbId.toString()] = getServerTimestamp();
    }
//--------------------------------------------
    this.resetReceivedGifts = function(saveImmediately)
    {
        this.mDbFields[CONST_KEY_SERVER_FIELD_GIFTS_RECEIVED] = [];
        if ( saveImmediately )
        {
            this.saveDbFields([CONST_KEY_SERVER_FIELD_GIFTS_RECEIVED]);
        }
    }
//--------------------------------------------
/*
Calculates possibility of sending gift to a friend with a help of timestamp of previous sending
returns bool value
 */
    this.canSend = function(friendFbId)
    {
        if ( !isObject(this.mDbFields[CONST_KEY_SERVER_FIELD_GIFTS_SENT_TIMESTAMP]) )
        {
            this.mDbFields[CONST_KEY_SERVER_FIELD_GIFTS_SENT_TIMESTAMP] = {};
            return true;
        }
        else
        {
            var CurTime = getServerTimestamp();
            var TimeOfSending = this.mDbFields[CONST_KEY_SERVER_FIELD_GIFTS_SENT_TIMESTAMP][friendFbId.toString()];
            if ( ( CurTime - TimeOfSending ) > CONST_SEND_FRIEND_GIFT_TIME_INTERVAL )
            {
                return true;
            }
        }
        return false;
    }
//--------------------------------------------
    this.isInitedSuccessfully = function()
    {
        return mDbFieldsInitedSuccessfully;
    }
//--------------------------------------------
//---private methods---
    function SetDbInited(success)
    {
        mDbFieldsInitedSuccessfully = success;
    }
}//End cUser

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
	var time = getServerTimestamp();
    return { serverTime: time };
}

//sending gift to friend
//input: friendFbId, senderFbId, item - type of resource to gift, count - count of resources
handlers.sendFriendGift = function(args) {
    var result = [];
    if ( isObject( args ) && ( "friendFbId" in args )  && ( "senderFbId" in args ) && ( "networkType" in args ) && ( "itemType" in args ) && ( "count" in args ) )
    {
        var FriendsIds = [];
        var IncomingGift = new cGift( args["senderFbId"], args["networkType"], args["itemType"], args["count"], -1 );
        FriendsIds = [args["friendFbId"]];



        var data = server.GetPlayFabIDsFromFacebookIDs({
            FacebookIDs: FriendsIds
        });

        if ( isObject( data ) && ( "Data" in data ) && ( isArray( data["Data"] ) ) )
        {
            var ids = data["Data"];
            var CountFriends = ids.length;

            for (var i = 0; i < CountFriends; i++) {
                if ( isObject( ids[i] ) && ( "FacebookId" in ids[i] ) && ( "PlayFabId" in ids[i] ) )
                {
                    var SenderUser = new cUser(currentPlayerId,"","");
                    SenderUser.readDbFields([CONST_KEY_SERVER_FIELD_GIFTS_SENT_TIMESTAMP]);
//                  Check timestamp previous sending
                    if ( SenderUser.canSend(ids[i]["FacebookId"]) )
                    {
                        var FriendUser = new cUser(ids[i]["PlayFabId"],ids[i]["FacebookId"],"");
                        FriendUser.readDbFields([CONST_KEY_SERVER_FIELD_GIFTS_RECEIVED]);
                        FriendUser.addNewGift(IncomingGift);
                        SenderUser.recalcSendTimer(FriendUser.mFacebookId);
                        FriendUser.saveDbFields([CONST_KEY_SERVER_FIELD_GIFTS_RECEIVED]);
                        SenderUser.saveDbFields([CONST_KEY_SERVER_FIELD_GIFTS_SENT_TIMESTAMP]);

                        GiftElement = {};
                        GiftElement["gift_timers"] = SenderUser.mDbFields[CONST_KEY_SERVER_FIELD_GIFTS_SENT_TIMESTAMP];
                        GiftElement["GiftResult"] = true;
                        result.push( GiftElement );
                    }
                    else
                    {
                        result = getError(CONST_ERROR_CODE_TOO_EARLY_TO_SEND_THIS_FRIEND, "Too early to send at sendFriendGift");
                    }
                }
            }
        }
        else
        {
            result = getError(CONST_ERROR_CODE_FRIEND_PROGRESS_AT_GIFTS_SENDING_NOT_FOUND, "Bad response at sendFriendGift");
        }
    }
    else
    {
        result = getError(CONST_ERROR_CODE_BAD_PARAMS_AT_GIFTS_SENDING, "Bad request data at sendFriendGift");
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
		result = getError(CONST_ERROR_CODE_FRIEND_PROGRESS_NOT_FOUND, "Bad response at getFriendsProgress");
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
		result = getError(CONST_ERROR_CODE_GET_CUSTOM_ID_NOT_FOUND_UUID, "Uuid not found");
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
    
    var myJSONArray = [ {info:{}}, {map:{}}, {vault:{}}, {creatures:{}}, {shop:{}}, {quests_tasks:{}}, {scores:{}}, {gameflagsparams:{}}, {battleinfo:{}}, {task_timers:{}}, {tutorial:{}}, {chest_shop:{}}, {gifts:[]}];
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
//input: key for save game object, leaveGifts: possible bool var to leave received gifts(uses at login from facebook)
handlers.loadMyProgress = function(args)
{
    var leaveReceivedGifts = false;
    var response = {};

    if ( isObject(args) && ("leaveGifts" in args) )
    {
        leaveReceivedGifts  = args.leaveGifts;
    }

    var User = new cUser(currentPlayerId,"","");
    User.readDbFields([CONST_KEY_SERVER_FIELD_GAME_PROGRESS, CONST_KEY_SERVER_FIELD_SAVE_OVERVIEW, CONST_KEY_SERVER_FIELD_GIFTS_RECEIVED, CONST_KEY_SERVER_FIELD_GIFTS_SENT_TIMESTAMP]);
    if ( User.isInitedSuccessfully() )
    {
        response = { result:{} };
        response.result["progress"] = User.mDbFields[CONST_KEY_SERVER_FIELD_GAME_PROGRESS];
        response.result["overview"] = User.mDbFields[CONST_KEY_SERVER_FIELD_SAVE_OVERVIEW];
        response.result["gifts"] = User.mDbFields[CONST_KEY_SERVER_FIELD_GIFTS_RECEIVED];
        response.result["gift_timers"] = User.mDbFields[CONST_KEY_SERVER_FIELD_GIFTS_SENT_TIMESTAMP];
//      Add server constants to response
        if ( CONST_ADD_CONSTANTS_TO_RESPONSE_AT_LOAD_PROGRESS )
        {
            response.result["consts"] = getServerConstantsObject();
        }
//      Now lets reset new gifts and save it immediately in database
        if ( !leaveReceivedGifts  )
        {
            User.resetReceivedGifts(true);
        }
    }
    else
    {
        response = getError(CONST_ERROR_CODE_LOADPROGRESS_NOT_FOUND_USERDATA, "Save or key not found");
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
