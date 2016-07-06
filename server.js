//----------------Value constants---------------------
var CONST_MAX_FRIENDS_COUNT_SCORES_TO_QUERY 			= 5;
//----------------End Value constants---------------------

//----------------Errors---------------------
// 1XXX Errors for Load Save Reset operations
var CONST_ERROR_CODE_LOADPROGRESS_NOT_FOUND_USERDATA	= 1001;

// 2XXX Errors for System additional operations
var CONST_ERROR_CODE_GET_CUSTOM_ID_NOT_FOUND_UUID 		= 2001;

// 3XXX Errors for FB interaction operations
var CONST_ERROR_CODE_FRIEND_PROGRESS_NOT_FOUND	 		= 3001;
//----------------End Errors---------------------
// -----------------------------------------------------------------
function isObject(val) {
    return val instanceof Object; 
}
//------------------------------------------------------------------ 
function isArray(val) {
    return val instanceof Array; 
}

handlers.getServerTime = function(args) {
	var now = new Date();
	var time = now.getTime();
    return { serverTime: time };
}
 
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
						Keys: ["Score"]
					});
				
				FriendElement = {FacebookId:ids[i]["FacebookId"]};
				FriendElement["PlayFabId"] = ids[i]["PlayFabId"];
				FriendElement["score"] = [];
				if ( isObject( ScoreData ) 
					&& ( "Data" in ScoreData ) 
					&& ( "Score" in ScoreData.Data ) 
					&& ( "Value" in ScoreData.Data.Score ) )
				{
					FriendElement["score"] = JSON.parse(ScoreData.Data.Score.Value);
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
			Keys: ["Uuid"]
	});
	
	if ( isObject(args) && ( "isFbAcc" in args ) )
	{
		result.isFbAcc = args.isFbAcc;
	}
	
	if ( isObject( data ) && ( "Data" in data ) && ( "Uuid" in data.Data ) && ( "Value" in data.Data.Uuid ) )
	{
		result.Uuid = data.Data.Uuid.Value;
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

	server.UpdateUserData({
		PlayFabId: currentPlayerId,
		Data: { 
			"Progress": null,
			"Scores": null
		}
	});
};
 
//save my progress, new version
//input: key for saved game and save data
handlers.saveMyProgress = function(args) {
    var gameData = args.gamedata;

    var userData = server.GetUserData({
    	PlayFabId: currentPlayerId,
        Keys: ["Progress"]
    });
    
    var SaveGame = [];
    
    if( "Progress" in userData.Data )
    {
    	if( "Value" in userData.Data.Progress )
    	{
    		SaveGame = JSON.parse(userData.Data.Progress.Value);
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
    
    var SaveObject = {"Progress":json, "Uuid":uuid_to_save};
    
    if ( ScoreData != null )
    {
    	SaveObject.Score = ScoreData;
    }
    if ( SaveOverview != null )
    {
    	SaveObject.SaveOverview = SaveOverview;
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
        Keys: ["Progress","SaveOverview"]
    });

	var gameDataKeys = args.gamedatakeys;
    var data = currentProgress.Data["Progress"];
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
		

	    if( "SaveOverview" in currentProgress.Data )
	    {
		    var overview = currentProgress.Data["SaveOverview"];	    	
		    if ( overview && ( "Value" in overview ))
		    {
		    	response.result["overview"] = JSON.parse(overview.Value);
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
				Keys: ["Progress"]
			});

			var data = currentProgress.Data["Progress"];

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
