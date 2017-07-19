//----------------Value constants---------------------
var CONST_MAX_FRIENDS_COUNT_SCORES_TO_QUERY 			= 4; //Max friend's scores to receive per one request
var CONST_MAX_FRIENDS_COUNT_ASK_GIFT     			    = 2; //Max friends count to ask for gift
var CONST_MAX_PLAYERS_COUNT_GET_PVP_INFO  			    = 4; //Max pvp players get detailed info per one request
//var CONST_SEND_FRIEND_GIFT_TIME_INTERVAL     			= 86400; //Time between gift sending to the same friend
var CONST_SEND_FRIEND_GIFT_TIME_INTERVAL     			= 45; //Time between gift sending to the same friend
var CONST_ASK_FRIEND_GIFT_TIME_INTERVAL     			= 45; //Time between gift asking to the same friend
var CONST_USE_SERVER_TIMESTAMPS_IN_SECONDS     			= true; //Cast server timestamp to seconds
var CONST_ADD_CONSTANTS_TO_RESPONSE_AT_LOAD_PROGRESS    = true; //Add server constants at loadMyProgress
var CONST_ASK_FRIEND_AMOUNT_ENERGY                      = 2; //Amount of resource asking for from friend
var CONST_ASK_FRIEND_AMOUNT_GOLD                        = 2; //Amount of resource asking for from friend
var CONST_ASK_FRIEND_AMOUNT_WOOD                        = 2; //Amount of resource asking for from friend
var CONST_ASK_FRIEND_AMOUNT_STONE                       = 2; //Amount of resource asking for from friend
//-----------------System constants-------------------
var CONST_SYSTEM_PASSW_CRON_TASKS_KEY					= "allow_cron_pass"; //This is key to password fiels. SYSTEM CONST, dont change it !!!!!!
var CONST_SYSTEM_PASSW_CRON_TASKS						= "9a6RCVLPwD0LLZGJfMFmn8pJYgXJcY"; //This is password to execute cron tasks. SYSTEM CONST, dont change it !!!!!!
var CONST_SYSTEM_ADMIN_GIFT_SENDER_NAME					= "AdminGifter"; //This is sender_id value who sends gifts from server
var CONST_SYSTEM_CRON_BLOCK_RESET_AND_START_NEW	= "block_reset_start"; //This is key to block reset leaderboard and start new tournamen from cronReward command. SYSTEM CONST, dont change it !!!!!!
/* About redeem types
    	"interval" type has startTimer And endTimer. This code will be active only in this time interval
    	"simple" will be active always when this code is in list of possible codes
    	redeemCode has "simple" type as default
        Possible resources types: "gold", "gems", "wood", "stone", "energy", "scrolls"
		Possible item types: you have to know tag and level combination
    */
var CONST_REDEEM_CODES = {
// interval code works since 1.02.2017 till 1.07.2017
	"q37":{"type":"interval",
           "start":1485907200,
				"end":1498867200,
				"reward":{
					"resources":{"gold":100,"wood":5},
					"items":[{"tag":10,"level":1}],
						 }
			},
// redeem code with simple type. Active always while it is here for each player once
	"s34":{"type":"simple",
				"reward":{
					"resources":{"gold":50},
					"items":[{"tag":15,"level":2}],
						 }
		  },
// redeem code with simple type. Active always while it is here for each player once
// All possible cheats in here
	"super-cheat-123":{"type":"simple",
				"reward":{
					"resources":{"gold":50,"gems":2,"wood":1,"stone":1, "energy":1, "scrolls":1},
					"items":[{"tag":5,"level":2},
                             {"tag":10,"level":1}
                            ],
						 }
		  },
// Active promo-codes
	"F2y4-h9Sq":{"type":"simple",
				"reward":{
					"resources":{"gold":2000},
						 }
		  },
	"92UK-58Xp":{"type":"simple",
				"reward":{
					"resources":{"scrolls":5},
						 }
		  },
	"UR72-gD3X":{"type":"simple",
				"reward":{
					"resources":{"gems":10},
						 }
		  },
// Promo codes for contest
	"VTvc-PT7c":{"type":"simple",
				"reward":{
					"resources":{"gems":100,"scrolls":10,"gold":10000},
						 }
		    },
	"3yRf-a7sd":{"type":"simple",
				"reward":{
					"resources":{"gems":25,"scrolls":5,"gold":5000},
						 }
		    },
	"F84b-dsCy":{"type":"simple",
				"reward":{
					"resources":{"gems":10,"scrolls":3,"gold":2000},
						 }
		    },
};
//----------------End Value constants---------------------

//----------------Server keys constants---------------------
var CONST_KEY_SERVER_FIELD_GAME_PROGRESS			= "Progress";
var CONST_KEY_SERVER_FIELD_VAULT_PROGRESS			= "VaultProgress";
var CONST_KEY_SERVER_FIELD_SAVE_OVERVIEW			= "SaveOverview";
var CONST_KEY_SERVER_FIELD_UUID        				= "Uuid";
var CONST_KEY_SERVER_FIELD_SCORE        			= "Score";
var CONST_KEY_SERVER_FIELD_GIFTS_RECEIVED			= "GiftsReceived";
var CONST_KEY_SERVER_FIELD_GIFTS_SENT_TIMESTAMP		= "GiftsSentTime";
var CONST_KEY_SERVER_FIELD_GIFTS_ASK_TIMESTAMP		= "GiftsAskTime";
var CONST_KEY_SERVER_FIELD_GAME_CENTER_ID   		= "GameCenterId";
var CONST_KEY_SERVER_FIELD_GOOGLE_PLUS_DATA   		= "GooglePlusData";
var CONST_KEY_SERVER_FIELD_REDEEM_CODE_DATA   		= "RedeemCodesUsed";
var CONST_KEY_SERVER_FIELD_TOURNAMENT_DATA   		= "Tournament";
//----------------Title Data keys constants---------------------
var CONST_KEY_TITLE_DATA_KEY_CURRENT_CLIENT_VERSION				= "SupportedClientVersion";
var CONST_KEY_INTERNAL_TITLE_DATA_KEY_CURRENT_TOURNAMENT		= "CurrentTournamentSettings";
var CONST_KEY_INTERNAL_TITLE_DATA_KEY_TOURNAMENT_ENEMIES		= "TournamentEnemies";
var CONST_KEY_INTERNAL_TITLE_DATA_KEY_TOURNAMENT_REWARDS		= "TournamentPossibleRewards";
var CONST_KEY_INTERNAL_TITLE_DATA_KEY_TOURNAMENT_MAPS			= "TournamentPossibleMaps";
var CONST_KEY_INTERNAL_TITLE_DATA_KEY_TOURNAMENT_PR_RANDOMED	= "TournamentPreviousRandomed";
var CONST_KEY_INTERNAL_TITLE_DATA_KEY_TOURNAMENT_CONSTANTS		= "TournamentConstants";
//----------------Statistics keys constants---------------------
var CONST_KEY_STATISTIC_ACTIVE_TOURNAMENT						= "ActiveTournament";
// var CONST_KEY_STATISTIC_ACTIVE_TOURNAMENT					= "TestBoard2";
//----------------End Server keys constants---------------------

//----------------Errors---------------------
// 1XXX Errors for Load Save Reset operations
var CONST_ERROR_CODE_LOADPROGRESS_NOT_FOUND_USERDATA	            = 1001;

// 2XXX Errors for System additional operations
var CONST_ERROR_CODE_GET_CUSTOM_ID_NOT_FOUND_UUID 		        	= 2001;

// 3XXX Errors for FB interaction operations
var CONST_ERROR_CODE_FRIEND_PROGRESS_NOT_FOUND	 		        	= 3001;
var CONST_ERROR_CODE_FRIEND_PROGRESS_AT_GIFTS_SENDING_NOT_FOUND	 	= 3002;
var CONST_ERROR_CODE_BAD_PARAMS_AT_GIFTS_SENDING            	 	= 3003;
var CONST_ERROR_CODE_TOO_EARLY_TO_SEND_THIS_FRIEND            	 	= 3004;
var CONST_ERROR_CODE_FRIEND_PROGRESS_AT_HELP_NOT_FOUND	 	        = 3005;
var CONST_ERROR_CODE_BAD_PARAMS_AT_HELP            	 	        	= 3006;
var CONST_ERROR_CODE_FRIEND_PROGRESS_AT_HELP_ASKING_NOT_FOUND	 	= 3007;
var CONST_ERROR_CODE_BAD_PARAMS_AT_HELP_ASKING            	 		= 3008;
var CONST_ERROR_CODE_TOO_EARLY_TO_ASK_THIS_FRIEND            	 	= 3009;
var CONST_ERROR_CODE_GC_LINK_BAD_PARAMS                     	 	= 3010;
var CONST_ERROR_CODE_GOOGLE_LINK_BAD_PARAMS                         = 3011;

// 4XXX Errors for RedeemCode operations
var CONST_ERROR_CODE_BAD_REDEEM_CODE_ID			 			= 4001;
var CONST_ERROR_CODE_BAD_REDEEM_CODE_SETTINGS	 		    = 4002;
var CONST_ERROR_CODE_LATE_TO_USE_THIS_CODE_INTERVAL		    = 4003;
var CONST_ERROR_CODE_PLAYER_ALREADY_USED_THIS_CODE			= 4004;
var CONST_ERROR_CODE_REDEEM_REQUEST_BAD_PARAMS				= 4005;
var CONST_ERROR_CODE_CANNOT_INIT_USER_AT_REDEEM				= 4006;

// 5XXX Errors for Tournament operations
var CONST_ERROR_CODE_BAD_INPUT_DATA					 		= 5001;
var CONST_ERROR_CODE_BAD_TIME_TO_EXECUTE			 		= 5002;
var CONST_ERROR_CODE_LOGICAL_ERROR			 				= 5003;
var CONST_ERROR_CODE_TOURNAMENT_IS_NOT_READY				= 5004;
var CONST_ERROR_CODE_ALREADY_STARTED						= 5005;
var CONST_ERROR_CODE_LATE_TO_SCORE							= 5006;
var CONST_ERROR_CODE_ALREADY_SCORED							= 5007;
var CONST_ERROR_CODE_NOT_STARTED							= 5008;
var CONST_ERROR_CODE_ALREADY_ADVERTIZED						= 5009;
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
function isString(val) {
    return (typeof val === 'string');
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
function getTimestampsForTournamentFromTodayByHM( hours, minutes, offset_start, tournament_duration, reward_duration ) {
    var now = new Date();
    now.setHours(hours);
    now.setMinutes(minutes);
    now.setSeconds(0);
    now.setMilliseconds(0);

    var time = now.getTime();
    time = Math.floor(time / 1000);
    var StartTime = time + offset_start; // Adds offset to calculate right start_timestamp
    var EndTime = StartTime + tournament_duration;
    var RewardTime = EndTime + reward_duration;
    return {StartTime:StartTime, EndTime:EndTime, RewardTime:RewardTime};
}
//------------------------------------------------------------------
function getServerConstantsObject() {
    var Constants = {};
    Constants["giftInterval"] = CONST_SEND_FRIEND_GIFT_TIME_INTERVAL;
    Constants["askInterval"] = CONST_ASK_FRIEND_GIFT_TIME_INTERVAL;
    Constants["countFriendsToAsk"] = CONST_MAX_FRIENDS_COUNT_ASK_GIFT;
    Constants["countPvpGetInfo"] = CONST_MAX_PLAYERS_COUNT_GET_PVP_INFO;
    Constants["countFriendsProgressPerRequest"] = CONST_MAX_FRIENDS_COUNT_SCORES_TO_QUERY;
    Constants["askVals"] = {"Energy":CONST_ASK_FRIEND_AMOUNT_ENERGY
                            , "Gold":CONST_ASK_FRIEND_AMOUNT_GOLD
                            , "Wood":CONST_ASK_FRIEND_AMOUNT_WOOD
                            , "Stone":CONST_ASK_FRIEND_AMOUNT_STONE};

    return Constants;
}
//------------------------------------------------------------------
function getError(code, msg) {
    return {code:code, msg: msg};
}
//-----------------------------------------------------------------
// Represents class of RedeemCode Element.
function cRedeemCodeElement(codeId)
{
    this.mCodeId = codeId;
    this.mDurationType = "simple"; // possible types "interval", "simple"
    this.mStartTimestamp = 0; // for "interval" type
    this.mEndTimestamp = 0; // for "interval" type
    /* About duration types
    	"interval" type has startTimer And endTimer. This code will be active only in this time interval
    	"simple" will be active always when this code is in list of possible codes
    	redeemCode has "simple" type as default
    */

    this.mReward = {};
    this.mIsInitedSuccessful = false;
    this.mErrorCode = 0;

	var _this = this; // private instance for private methods

//public
//------------------------
    this.IsSimple = function()
    {
        return this.mDurationType == "simple";
    }
//------------------------
    this.IsInterval = function()
    {
        return this.mDurationType == "interval";
    }
//------------------------
    this.IsInitedSuccessful = function()
    {
        return this.mIsInitedSuccessful;
    }
//------------------------
    this.IsAvailable = function()
    {
        if ( !this.IsInitedSuccessful() ) // bad settings params or input data
        {
        	return false;
        }

        if ( this.IsSimple() )
        {
        	return true;
        }

        if ( this.IsInterval() )
        {
        	var CurTime = getServerTimestamp();
        	if ( this.mStartTimestamp <= CurTime && this.mEndTimestamp >= CurTime )
        	{
        		return true;
        	}
        	else
        	{
        		_this.mErrorCode = CONST_ERROR_CODE_LATE_TO_USE_THIS_CODE_INTERVAL;
        	}
        }
        return false;
    }
//------------------------
    this.GetReward = function()
    {
        return this.mReward;
    }
//private
//------------------------
    function Constructor()
    {
	    _this.mIsInitedSuccessful = true;
    	if ( isObject(CONST_REDEEM_CODES) && _this.mCodeId in CONST_REDEEM_CODES && isObject(CONST_REDEEM_CODES[_this.mCodeId]) )
		{
			var TempObj = CONST_REDEEM_CODES[_this.mCodeId];
			var TypeKey = "type";
			var StartKey = "start";
			var EndKey = "end";
			var RewardKey = "reward";

			if ( TypeKey in TempObj )
			{
				_this.mDurationType = TempObj[TypeKey];
			}

			if ( _this.IsInterval() )
			{
				if ( StartKey in TempObj && EndKey in TempObj )
				{
					_this.mStartTimestamp = TempObj[StartKey];
					_this.mEndTimestamp = TempObj[EndKey];
				}
				else
				{
					_this.mErrorCode = CONST_ERROR_CODE_BAD_REDEEM_CODE_SETTINGS;
					_this.mIsInitedSuccessful = false;
					return;
				}
			}

			if ( RewardKey in TempObj )
			{
				_this.mReward = TempObj[RewardKey];
			}
			else
			{
				_this.mErrorCode = CONST_ERROR_CODE_BAD_REDEEM_CODE_SETTINGS;
				_this.mIsInitedSuccessful = false;
				return;
			}
		}
		else
		{
			_this.mErrorCode = CONST_ERROR_CODE_BAD_REDEEM_CODE_ID;
			_this.mIsInitedSuccessful = false;
		}
    }

	Constructor();
}
//-----------------------------------------------------------------
// Represents Tournament class.
function cTournament( tid, count_checkoints, battle_timeout, checkpoint_timeout, stime, etime, user_data )
{
    this.mId = tid;
    this.mCountCheckpoints = count_checkoints;
    this.mTimeoutCheckpoint = checkpoint_timeout;
    this.mTimeoutBattle = battle_timeout;
    this.mCheckpoints = {};
	this.mStartTime = stime;
	this.mEndTime = etime;
    this.mTotalPoints = 0;

	var _this = this; // private instance for private methods

  	if ( isObject(user_data) )
    {
      	this.mCheckpoints = user_data;
    }
    else
    {
        GenerateCheckpoints();
    }

    calcTotalPoints();

//public
    this.GetSaveObject = function()
    {
        return {"tid":this.mId
                , "total_points": this.mTotalPoints
            , "checkpoints":this.mCheckpoints
               };
    }
//-----------------------
    this.startCheckpoint = function( ch_id )
    {
        if ( isObject(this.mCheckpoints) && ( ch_id in this.mCheckpoints ) )
        {
            var IdCheckpointNum = parseInt(ch_id.substr(2));
            var Checkpoint = this.mCheckpoints[ch_id];
            var CurTimestamp = getServerTimestamp();
            if ( !Checkpoint.started )
            {
              	// TODO: Aleksey time check. I'll di it later in case of need. It checks on client now
                Checkpoint.started = true;
                Checkpoint.available_until = CurTimestamp + this.mTimeoutBattle;
                this.mCheckpoints[ch_id] = Checkpoint;
                // Check for next checkpoint
                var NextCheckpointKey = "ch"+(IdCheckpointNum+1);
                if ( NextCheckpointKey in this.mCheckpoints )
                {
                    this.mCheckpoints[NextCheckpointKey].available_since = CurTimestamp + this.mTimeoutCheckpoint;
                }
                return {is_success:true};
            }
            else
            {
				return {is_success:false, code:CONST_ERROR_CODE_ALREADY_STARTED};
            }
        }
	    else
        {
			return {is_success:false, code:CONST_ERROR_CODE_LOGICAL_ERROR};
        }
    }
//-----------------------
    this.scoreCheckpoint = function( ch_id, points )
    {
        if ( isObject(this.mCheckpoints) && ( ch_id in this.mCheckpoints ) )
        {
            var IdCheckpointNum = parseInt(ch_id.substr(2));
            var Checkpoint = this.mCheckpoints[ch_id];
            var CurTimestamp = getServerTimestamp();
            if ( Checkpoint.started )
            {
              	if ( !Checkpoint.pointed )
                {
                    // TODO: Aleksey time check. I'll di it later in case of need. It checks on client now
                  	if ( CurTimestamp <= Checkpoint.available_until )
                    {
                        Checkpoint.pointed = true;
                        Checkpoint.points = points;
                        this.mCheckpoints[ch_id] = Checkpoint;
                      	calcTotalPoints();
                        return {is_success:true, points: points};
                    }
                  	else
                    {
                        return {is_success:false, code:CONST_ERROR_CODE_LATE_TO_SCORE};
                    }
                }
              	else
                {
                  	return {is_success:false, code:CONST_ERROR_CODE_ALREADY_SCORED};
                }
            }
            else
            {
				return {is_success:false, code:CONST_ERROR_CODE_NOT_STARTED};
            }
        }
	    else
        {
			return {is_success:false, code:CONST_ERROR_CODE_LOGICAL_ERROR};
        }
    }
//-----------------------
    this.advertizeCheckpoint = function( ch_id, koef )
    {
        if ( isObject(this.mCheckpoints) && ( ch_id in this.mCheckpoints ) )
        {
            var Checkpoint = this.mCheckpoints[ch_id];
            var CurTimestamp = getServerTimestamp();
            if ( !Checkpoint.advertized )
            {
              	var Delta = Checkpoint.available_since - CurTimestamp;
                if( Delta > 0 )
                {
                    Delta *= koef;
                    Checkpoint.available_since -= Math.ceil(Delta);
                }
                Checkpoint.advertized = true;
                this.mCheckpoints[ch_id] = Checkpoint;
                return {is_success:true};
            }
            else
            {
				return {is_success:false, code:CONST_ERROR_CODE_ALREADY_ADVERTIZED};
            }
        }
	    else
        {
			return {is_success:false, code:CONST_ERROR_CODE_LOGICAL_ERROR};
        }
    }
//-----------------------
    this.unlockCheckpoint = function( ch_id )
    {
        if ( isObject(this.mCheckpoints) && ( ch_id in this.mCheckpoints ) )
        {
            var Checkpoint = this.mCheckpoints[ch_id];
            var CurTimestamp = getServerTimestamp();
            if ( !Checkpoint.started )
            {
              	Checkpoint.available_since = CurTimestamp - 1;
                this.mCheckpoints[ch_id] = Checkpoint;
                return {is_success:true};
            }
            else
            {
				return {is_success:false, code:CONST_ERROR_CODE_ALREADY_STARTED};
            }
        }
	    else
        {
			return {is_success:false, code:CONST_ERROR_CODE_LOGICAL_ERROR};
        }
    }
//private
    function GenerateCheckpoints()
  	{
      	var TempChecks = {};
      	for ( var i = 1; i <= _this.mCountCheckpoints; i++ )
        {
            TempChecks["ch"+i] = GetEmptyCheckpoint();
        }

        _this.mCheckpoints = TempChecks;
  	}
//--------------
  	function calcTotalPoints()
  	{
      	var TempPoints = 0;
      	for ( var key in _this.mCheckpoints  )
        {
          	if ( _this.mCheckpoints[key].pointed )
            {
              	TempPoints += _this.mCheckpoints[key].points;
            }
        }
        _this.mTotalPoints = TempPoints;
      	return TempPoints;
  	}
//--------------
    function GetEmptyCheckpoint()
  	{
        return {started:false, available_since:0, available_until:0, points:0, pointed:false, advertized:false};
    }
}
//-----------------------------------------------------------------
// Represents Gift class.
function cGift(sender, networkType, itemType, amount, uid, giftType)
{
    this.mSender = sender;
    this.mNetworkType = networkType;
    this.mItemType = itemType;
    this.mAmount = amount;
    this.mId = uid;
    this.mGiftType = giftType;

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
            , "giftType":this.mGiftType
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
    this.mFacebookInfo = {};
    this.mFullname = "";
    this.mUuid = uuid;
    this.mDbFields = {};

    this.mDbFields[CONST_KEY_SERVER_FIELD_GAME_PROGRESS]				= [];
    this.mDbFields[CONST_KEY_SERVER_FIELD_SAVE_OVERVIEW]				= {};
    this.mDbFields[CONST_KEY_SERVER_FIELD_UUID]        					= "";
    this.mDbFields[CONST_KEY_SERVER_FIELD_SCORE]        				= [];
    this.mDbFields[CONST_KEY_SERVER_FIELD_GIFTS_RECEIVED]				= [];
    this.mDbFields[CONST_KEY_SERVER_FIELD_GIFTS_SENT_TIMESTAMP]			= {};
    this.mDbFields[CONST_KEY_SERVER_FIELD_GIFTS_ASK_TIMESTAMP]			= {};
    this.mDbFields[CONST_KEY_SERVER_FIELD_GAME_CENTER_ID]				= "";
    this.mDbFields[CONST_KEY_SERVER_FIELD_GOOGLE_PLUS_DATA]				= {};
    this.mDbFields[CONST_KEY_SERVER_FIELD_REDEEM_CODE_DATA]				= [];
    this.mDbFields[CONST_KEY_SERVER_FIELD_TOURNAMENT_DATA]				= {};

//---private members---
    var mDbFieldsInitedSuccessfully = false;
    var mUserAccountInfoInitedSuccessfully = false;

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
                        if ( Key != CONST_KEY_SERVER_FIELD_UUID && Key != CONST_KEY_SERVER_FIELD_GAME_CENTER_ID )
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
/*****
Updates main progress field by merging it with vault external field. Calls at loadProgress handler command
*****/
    this.updateProgressWithExternalVaultField = function()
    {
      	if ( this.isInitedSuccessfully() )
        {
          	if ( CONST_KEY_SERVER_FIELD_VAULT_PROGRESS in this.mDbFields && isObject(this.mDbFields[CONST_KEY_SERVER_FIELD_VAULT_PROGRESS]) )
            {
              	if ( CONST_KEY_SERVER_FIELD_GAME_PROGRESS in this.mDbFields && isArray(this.mDbFields[CONST_KEY_SERVER_FIELD_GAME_PROGRESS]) )
                {
                  	var VaultKey = "vault";
                  	var Len = this.mDbFields[CONST_KEY_SERVER_FIELD_GAME_PROGRESS].length;
                  	// Search for "vault" object to modify it
                  	for ( var i = 0; i < Len; i++ )
                    {
                        var Obj = this.mDbFields[CONST_KEY_SERVER_FIELD_GAME_PROGRESS][i];
                      	if ( isObject(Obj) && VaultKey in Obj )
                        {
                        	Obj[VaultKey] = this.mDbFields[CONST_KEY_SERVER_FIELD_VAULT_PROGRESS];
                          	this.mDbFields[CONST_KEY_SERVER_FIELD_GAME_PROGRESS][i] = Obj;
                          	break;
                        }
                    }
                }
            }
        }
    }
//--------------------------------------------
    this.initTournament = function( tournament, saveImmediately )
    {
    	this.mDbFields[CONST_KEY_SERVER_FIELD_TOURNAMENT_DATA] = tournament.GetSaveObject();
        if ( saveImmediately )
        {
            this.saveDbFields([CONST_KEY_SERVER_FIELD_TOURNAMENT_DATA]);
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
/******
Get detailed account info with a help of server api. FbId ...
 ******/
    this.getUserAccountInfo = function()
    {
        var AccountInfo =  server.GetUserAccountInfo({
            PlayFabId: this.mPlayFabId
        });
        if ( isObject(AccountInfo) && "UserInfo" in AccountInfo )
        {
            // Checking facebook linkage
            if ( isObject(AccountInfo.UserInfo)
                && "FacebookInfo" in AccountInfo.UserInfo
                && isObject(AccountInfo.UserInfo.FacebookInfo)
                && "FacebookId" in AccountInfo.UserInfo.FacebookInfo
                && "FullName" in AccountInfo.UserInfo.FacebookInfo
                )
            {
                this.mFacebookId = AccountInfo.UserInfo.FacebookInfo.FacebookId;
                this.mFullname = AccountInfo.UserInfo.FacebookInfo.FullName;
                this.mFacebookInfo = AccountInfo.UserInfo.FacebookInfo;
            }
        }
        SetUserAccountInfoInited(true);
    }
//--------------------------------------------
/******
If there is FbId GoogleId GCid linkage - says its Id, in the other way advises to generate name...
******/
    this.getNamePresence = function()
    {
        var KEY_NEED_GENERATION = "need_generation";
        var RetObject = {};
        if ( !mUserAccountInfoInitedSuccessfully )
        {
            this.getUserAccountInfo();
        }

        RetObject[KEY_NEED_GENERATION] = true;
        if ( this.mFacebookId )
        {
            RetObject["fbinfo"] = this.mFacebookInfo;
            RetObject[KEY_NEED_GENERATION] = false;
        }
        return RetObject;
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
    this.recalcAskTimer = function(friendFbId)
    {
        if ( !isObject(this.mDbFields[CONST_KEY_SERVER_FIELD_GIFTS_ASK_TIMESTAMP]) )
        {
            this.mDbFields[CONST_KEY_SERVER_FIELD_GIFTS_ASK_TIMESTAMP] = {};
        }
        this.mDbFields[CONST_KEY_SERVER_FIELD_GIFTS_ASK_TIMESTAMP][friendFbId.toString()] = getServerTimestamp();
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
/* Calculates possibility of sending gift to a friend with a help of timestamp of previous sending
returns bool value */
    this.canSend = function(friendFbId)
    {
        if ( !isObject(this.mDbFields[CONST_KEY_SERVER_FIELD_GIFTS_SENT_TIMESTAMP]) )
        {
            this.mDbFields[CONST_KEY_SERVER_FIELD_GIFTS_SENT_TIMESTAMP] = {};
            return true;
        }
        else
        {
            if ( friendFbId in this.mDbFields[CONST_KEY_SERVER_FIELD_GIFTS_SENT_TIMESTAMP] )
            {
                var CurTime = getServerTimestamp();
                var TimeOfSending = this.mDbFields[CONST_KEY_SERVER_FIELD_GIFTS_SENT_TIMESTAMP][friendFbId.toString()];
                if ( ( CurTime - TimeOfSending ) > CONST_SEND_FRIEND_GIFT_TIME_INTERVAL )
                {
                    return true;
                }
            }
            else //Sending gift first time
            {
                return true;
            }
        }
        return false;
    }
//--------------------------------------------
/*  Calculates possibility of asking for help from a friend with a help of timestamp of previous asking
returns bool value     */
    this.canAsk = function(friendFbId)
    {
        if ( !isObject(this.mDbFields[CONST_KEY_SERVER_FIELD_GIFTS_ASK_TIMESTAMP]) )
        {
            this.mDbFields[CONST_KEY_SERVER_FIELD_GIFTS_ASK_TIMESTAMP] = {};
            return true;
        }
        else
        {
            if ( friendFbId in this.mDbFields[CONST_KEY_SERVER_FIELD_GIFTS_ASK_TIMESTAMP] )
            {
                var CurTime = getServerTimestamp();
                var TimeOfSending = this.mDbFields[CONST_KEY_SERVER_FIELD_GIFTS_ASK_TIMESTAMP][friendFbId.toString()];
                if ( ( CurTime - TimeOfSending ) > CONST_ASK_FRIEND_GIFT_TIME_INTERVAL )
                {
                    return true;
                }
            }
            else //Asking gift first time
            {
                return true;
            }
        }
        return false;
    }
//--------------------------------------------
    this.useRedeeemCode = function(codeRedeem, saveImmediately)
    {
        if ( !isArray(this.mDbFields[CONST_KEY_SERVER_FIELD_REDEEM_CODE_DATA]) )
        {
            this.mDbFields[CONST_KEY_SERVER_FIELD_REDEEM_CODE_DATA] = [];
        }
        this.mDbFields[CONST_KEY_SERVER_FIELD_REDEEM_CODE_DATA].push(codeRedeem.mCodeId);

        if ( saveImmediately )
        {
            this.saveDbFields([CONST_KEY_SERVER_FIELD_REDEEM_CODE_DATA]);
        }
    }
//--------------------------------------------
/* Returns true if this code was already redeemed by this user */
    this.usedAlreadyRedeemCode = function(codeRedeem)
    {
        if ( isArray(this.mDbFields[CONST_KEY_SERVER_FIELD_REDEEM_CODE_DATA]) )
        {
            if ( this.mDbFields[CONST_KEY_SERVER_FIELD_REDEEM_CODE_DATA].indexOf(codeRedeem.mCodeId) > -1 )
            {
            	return true;
            }
        }

		return false;
    }
//--------------------------------------------
    this.setGameCenterId = function(gc_id, saveImmediately)
    {
        this.mDbFields[CONST_KEY_SERVER_FIELD_GAME_CENTER_ID] = gc_id;
        if ( saveImmediately )
        {
            this.saveDbFields([CONST_KEY_SERVER_FIELD_GAME_CENTER_ID]);
        }
    }
//--------------------------------------------
    this.setGooglePlusData = function(gplus_id, fullname, photo_url, saveImmediately)
    {
        this.mDbFields[CONST_KEY_SERVER_FIELD_GOOGLE_PLUS_DATA] = {"gplus_id":gplus_id,
        "fullname": fullname, "photo_url": photo_url};
        if ( saveImmediately )
        {
            this.saveDbFields([CONST_KEY_SERVER_FIELD_GOOGLE_PLUS_DATA]);
        }
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
    function SetUserAccountInfoInited(success)
    {
        mUserAccountInfoInitedSuccessfully = success;
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
    var result = {};
    if ( isObject( args ) && ( "friendFbId" in args )  && ( "senderFbId" in args ) && ( "networkType" in args ) && ( "itemType" in args ) && ( "count" in args ) )
    {
        var GiftType = args["itemType"]; //Passing item type as gift type because it means resource gift without any other logic
        var FriendsIds = [];
        var IncomingGift = new cGift( args["senderFbId"], args["networkType"], args["itemType"], args["count"], -1, GiftType );
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
                        result = GiftElement;
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

//asking for help from friend
//input: friendFbId, senderFbId, item - type of resource to gift, count - count of resources
handlers.askHelpFriend = function(args) {
    var result = {};
    if ( isObject( args ) && ( "friendFbIds" in args ) && isArray(args["friendFbIds"])  && ( "senderFbId" in args ) && ( "networkType" in args ) && ( "itemType" in args ) && ( "count" in args ) )
    {
        var GiftType = "Help"; //Passing "Help" type as gift type because it means only help request
        var FriendsIds = args["friendFbIds"];
        var IncomingGift = new cGift( args["senderFbId"], args["networkType"], args["itemType"], args["count"], -1, GiftType );

        var data = server.GetPlayFabIDsFromFacebookIDs({
            FacebookIDs: FriendsIds
        });

        if ( isObject( data ) && ( "Data" in data ) && ( isArray( data["Data"] ) ) )
        {
            var ids = data["Data"];
            var CountFriends = ids.length;
            var CountIterations = Math.min( CountFriends, CONST_MAX_FRIENDS_COUNT_ASK_GIFT );

            var SenderUser = new cUser(currentPlayerId,"","");
            SenderUser.readDbFields([CONST_KEY_SERVER_FIELD_GIFTS_ASK_TIMESTAMP]);
            var WasSuccessfullAsks = false;


            for (var i = 0; i < CountIterations; i++) {
                if ( isObject( ids[i] ) && ( "FacebookId" in ids[i] ) && ( "PlayFabId" in ids[i] ) )
                {

//                  Check timestamp previous sending
                    if ( SenderUser.canAsk(ids[i]["FacebookId"]) )
                    {
                        var FriendUser = new cUser(ids[i]["PlayFabId"],ids[i]["FacebookId"],"");
                        FriendUser.readDbFields([CONST_KEY_SERVER_FIELD_GIFTS_RECEIVED]);
                        FriendUser.addNewGift(IncomingGift);
                        SenderUser.recalcAskTimer(FriendUser.mFacebookId);
                        FriendUser.saveDbFields([CONST_KEY_SERVER_FIELD_GIFTS_RECEIVED]);
                        // Flag to save sender data ONCE after all operations
                        WasSuccessfullAsks = true;
                    }
                    else
                    {
                        //result = getError(CONST_ERROR_CODE_TOO_EARLY_TO_ASK_THIS_FRIEND, "Too early to send at askHelpFriend");
                    }
                }
            }
            var GiftElement = {};

            if ( WasSuccessfullAsks )
            {
                // Save info of sender
                SenderUser.saveDbFields([CONST_KEY_SERVER_FIELD_GIFTS_ASK_TIMESTAMP]);
                GiftElement["ask_timers"] = SenderUser.mDbFields[CONST_KEY_SERVER_FIELD_GIFTS_ASK_TIMESTAMP];
            }
            GiftElement["AskResult"] = true;
            result = GiftElement;
        }
        else
        {
            result = getError(CONST_ERROR_CODE_FRIEND_PROGRESS_AT_HELP_ASKING_NOT_FOUND, "Bad response at askHelpFriend");
        }
    }
    else
    {
        result = getError(CONST_ERROR_CODE_BAD_PARAMS_AT_HELP_ASKING, "Bad request data at askHelpFriend");
    }

    return {result: result};
};

//help friend by sending gift
//input: friendFbId, senderFbId, item - type of resource to gift, count - count of resources
handlers.helpFriend = function(args) {
    var result = [];
    if ( isObject( args ) && ( "friendFbId" in args )  && ( "senderFbId" in args ) && ( "networkType" in args ) && ( "itemType" in args ) && ( "count" in args ) )
    {
        var GiftType = args["itemType"]; //Passing item type as gift type because it means resource gift without any other logic
        var FriendsIds = [];
        var IncomingGift = new cGift( args["senderFbId"], args["networkType"], args["itemType"], args["count"], -1, GiftType );
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
                    var FriendUser = new cUser(ids[i]["PlayFabId"],ids[i]["FacebookId"],"");
                    FriendUser.readDbFields([CONST_KEY_SERVER_FIELD_GIFTS_RECEIVED]);
                    FriendUser.addNewGift(IncomingGift);
                    FriendUser.saveDbFields([CONST_KEY_SERVER_FIELD_GIFTS_RECEIVED]);

                    GiftElement = {};
                    GiftElement["HelpResult"] = true;
                    result.push( GiftElement );
                }
            }
        }
        else
        {
            result = getError(CONST_ERROR_CODE_FRIEND_PROGRESS_AT_HELP_NOT_FOUND, "Bad response at helpFriend");
        }
    }
    else
    {
        result = getError(CONST_ERROR_CODE_BAD_PARAMS_AT_HELP, "Bad request data at helpFriend");
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

// saves Game Center Id for player. Uses only for IOS client version
//input: GCId - Game Center Id string
handlers.linkGameCenterManually = function(args) {
    if ( isObject(args) && "GCId" in args )
    {
        var User = new cUser( currentPlayerId, "" , "" );
        User.setGameCenterId( args["GCId"], true ); // Setting new Id and save it immediately
        result = {isSuccess:true};
    }
    else
    {
        result = getError(CONST_ERROR_CODE_GC_LINK_BAD_PARAMS , "Bad params");
    }

    return result;
}

// saves Google plus Id, fullname, photo_url for player. Uses only for Android client version
//input: GPId - Google Plis Id string
// Fullname - Fullname of player string
// PhotoUrl - string
handlers.linkGooglePlusManually = function(args) {
    if ( isObject(args) && "GPId" in args && "Fullname" in args && "PhotoUrl" in args )
    {
        var User = new cUser( currentPlayerId, "" , "" );
        User.setGooglePlusData( args["GPId"], args["Fullname"], args["PhotoUrl"], true ); // Setting new Id and save it immediately
        result = {isSuccess:true};
    }
    else
    {
        result = getError(CONST_ERROR_CODE_GOOGLE_LINK_BAD_PARAMS , "Bad params");
    }

    return result;
}

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

    var uuid_to_save = "";
    var SaveOverview = null;
    var ScoreData = null;
    var VaultData = null;

    var isNewVersion = false;

    for (var i = 0; i < gameData.length; i++) {
        var obj = gameData[i];
        if ("info" in obj && "version" in obj["info"] && obj["info"]["version"] == "0.99") {
            isNewVersion = true;
        }
    }

    if (isNewVersion) {
        for (var i = 0; i < SaveGame.length; i++) {
            var obj = SaveGame[i];

            for (var property in obj) {
                if (property == "map") {
                    SaveGame[i] = {map:{}};
                }
                else if (property == "scores") {
                    SaveGame[i] = {scores:{}};
                }
                else if (property == "battleinfo") {
                    SaveGame[i] = {battleinfo:{}};
                }
            }
        }
    }

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
            else if ( property == "vault" )
            {
                VaultData = JSON.stringify(obj["vault"]);
            }
            else if ( property == "info" && isObject(obj[property]) && ( "uuid" in obj[property] ) ) // searching uuid to save
            {
                uuid_to_save = obj[property]["uuid"];
            }

            var lfound = false;
            for (var j = 0; j < SaveGame.length; j++)
            {
                var obj2 = SaveGame[j];

                for (var propertySaveGame in obj2)
                {
                    if ( property == "vault" && property==propertySaveGame ) // reset vault data
                    {
                        SaveGame[j] = {vault:{}};
                        lfound = true;
                        break;
                    }
                    else if (property==propertySaveGame)
                    {
                        SaveGame[j] = gameData[i];
                        lfound = true;
                        break;
                    }
                    if (lfound)
                        break;
                }
            }

            if (!lfound) {
                SaveGame.push(gameData[i]);
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
    if ( VaultData != null )
    {
    	SaveObject[CONST_KEY_SERVER_FIELD_VAULT_PROGRESS] = VaultData;
    }

    // Separate updating into multiple request to fix 30kb limit as argument
    for ( var KeyToSave in SaveObject )
    {
      	var ObjectPart = {};
        ObjectPart[KeyToSave] = SaveObject[KeyToSave];
        var res = server.UpdateUserData({
            PlayFabId: currentPlayerId,
        	Data: ObjectPart
        });
    }
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
    User.readDbFields([CONST_KEY_SERVER_FIELD_GAME_PROGRESS, CONST_KEY_SERVER_FIELD_SAVE_OVERVIEW, CONST_KEY_SERVER_FIELD_GIFTS_RECEIVED
        , CONST_KEY_SERVER_FIELD_GIFTS_SENT_TIMESTAMP
        , CONST_KEY_SERVER_FIELD_GIFTS_ASK_TIMESTAMP
        , CONST_KEY_SERVER_FIELD_GAME_CENTER_ID
        , CONST_KEY_SERVER_FIELD_GOOGLE_PLUS_DATA,
        , CONST_KEY_SERVER_FIELD_VAULT_PROGRESS
        , "test_field"
        ]);

  	if ( User.isInitedSuccessfully() )
    {
      	User.updateProgressWithExternalVaultField();//Modify vault field with main progress field

        response = { result:{} };
        response.result["progress"] = User.mDbFields[CONST_KEY_SERVER_FIELD_GAME_PROGRESS];
        response.result["overview"] = User.mDbFields[CONST_KEY_SERVER_FIELD_SAVE_OVERVIEW];
        response.result["gifts"] = User.mDbFields[CONST_KEY_SERVER_FIELD_GIFTS_RECEIVED];
        response.result["gift_timers"] = User.mDbFields[CONST_KEY_SERVER_FIELD_GIFTS_SENT_TIMESTAMP];
        response.result["ask_timers"] = User.mDbFields[CONST_KEY_SERVER_FIELD_GIFTS_ASK_TIMESTAMP];
        response.result["gc_id"] = User.mDbFields[CONST_KEY_SERVER_FIELD_GAME_CENTER_ID];
        response.result["gplus"] = User.mDbFields[CONST_KEY_SERVER_FIELD_GOOGLE_PLUS_DATA];
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
//input: codeId
handlers.redeemPromoCode = function(args)
{
	var response = {};
	if ( isObject(args) && ("codeId" in args) )
    {
        var codeId = args["codeId"];
	    var CodeElement = new cRedeemCodeElement(codeId);

	    if ( !CodeElement.IsInitedSuccessful() || !CodeElement.IsAvailable() )
	    {
	    	response = getError(CodeElement.mErrorCode, "Error");
	    }
	    else
	    {
	    	// Init user to check his redeem codes
	    	var User = new cUser(currentPlayerId,"","");
			User.readDbFields([CONST_KEY_SERVER_FIELD_REDEEM_CODE_DATA]);
			if ( User.isInitedSuccessfully() )
			{
				if ( User.usedAlreadyRedeemCode(CodeElement) ) // Already redeemed by this user
				{
					response = getError(CONST_ERROR_CODE_PLAYER_ALREADY_USED_THIS_CODE, "Already used");
				}
				else // Everything is great
				{
					User.useRedeeemCode(CodeElement, true); // Use this code and save it immediately
					response["reward"]=CodeElement.GetReward();
				}
			}
			else
			{
				response = getError(CONST_ERROR_CODE_CANNOT_INIT_USER_AT_REDEEM, "User problem");
			}
		}
    }
    else
    {
    	response = getError(CONST_ERROR_CODE_REDEEM_REQUEST_BAD_PARAMS, "Bad params");
    }

    return response;
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
		for (var i = 0; i < leaderboard.Leaderboard.length; i++)
        {
			var player = leaderboard.Leaderboard[i];
			if (player.PlayFabId == currentPlayerId)
            {
//              Request sender is not searching element, pass him
				continue;
			}

//-- START TODO remove this hardcode after testing. This part of code adds players with facebook linked accounts
            // if ( i == 0 )
            // {
            //     var PossiblePlayers = ["26A034D4D5C9F0F0","714C003E1ABF156","8CCDCAAB7DEC6F8","3EDB58C3E81D6362"];
            //     var SelectedId = PossiblePlayers[0];
            //     if ( currentPlayerId == PossiblePlayers[0] )
            //     {
            //         SelectedId = PossiblePlayers[1];
            //     }
            //     player.PlayFabId = SelectedId;
            // }
//-- END TODO remove this hardcode after testing. This part of code adds players with facebook linked accounts

            var PvpPlayer = new cUser( player.PlayFabId, "", "" );
            PvpPlayer.readDbFields([CONST_KEY_SERVER_FIELD_GAME_PROGRESS, CONST_KEY_SERVER_FIELD_GAME_CENTER_ID, CONST_KEY_SERVER_FIELD_GOOGLE_PLUS_DATA]);
            if ( PvpPlayer.isInitedSuccessfully() )
            {
                var progress = PvpPlayer.mDbFields[CONST_KEY_SERVER_FIELD_GAME_PROGRESS];
                var GameCenterId = PvpPlayer.mDbFields[CONST_KEY_SERVER_FIELD_GAME_CENTER_ID];
                var GooglePlusData = PvpPlayer.mDbFields[CONST_KEY_SERVER_FIELD_GOOGLE_PLUS_DATA];

                var heroes = [];

                if (progress)
                {
                    for (var j = 0; j < progress.length; j++)
                    {
                        var obj = progress[j];
                        if ( ("creatures" in obj) )
                        {
                            if ("heroes" in obj.creatures)
                            {
                                heroes = obj.creatures.heroes;
                            }
                            break;
                        }
                    }
                }

                var playerRank = player["Position"] + 1;
                var NameDataInfo = PvpPlayer.getNamePresence();
                var pl = {playfabid: PvpPlayer.mPlayFabId, name: PvpPlayer.mFullname/*player["DisplayName"]*/
                    , rank: playerRank , rate: player["StatValue"]
                    , heroes: heroes, name_info: NameDataInfo, gc_id: GameCenterId, gplus: GooglePlusData };
                players.push(pl);
            }
		}
	}

	return { result: { "players": players } };
}

/*
* Get Pvp player Info.
* Input - array of playfabIds
*/
handlers.getPvpPlayerInfo = function(args) {

    var players = [];

    if ( isObject( args ) && ( "players" in args ) && isArray( args.players ) )
    {
        var InputPlayers = args.players;
        for (var i = 0; i < InputPlayers.length; i++)
        {

            var PvpPlayer = new cUser( InputPlayers[i], "", "" );
            PvpPlayer.readDbFields([CONST_KEY_SERVER_FIELD_GAME_PROGRESS, CONST_KEY_SERVER_FIELD_GAME_CENTER_ID, CONST_KEY_SERVER_FIELD_GOOGLE_PLUS_DATA]);
            if ( PvpPlayer.isInitedSuccessfully() )
            {
                var progress = PvpPlayer.mDbFields[CONST_KEY_SERVER_FIELD_GAME_PROGRESS];
                var GameCenterId = PvpPlayer.mDbFields[CONST_KEY_SERVER_FIELD_GAME_CENTER_ID];
                var GooglePlusData = PvpPlayer.mDbFields[CONST_KEY_SERVER_FIELD_GOOGLE_PLUS_DATA];

                var heroes = [];

                if (progress)
                {
                    for (var j = 0; j < progress.length; j++)
                    {
                        var obj = progress[j];
                        if ( ("creatures" in obj) )
                        {
                            if ("heroes" in obj.creatures)
                            {
                                heroes = obj.creatures.heroes;
                            }
                            break;
                        }
                    }
                }

                var NameDataInfo = PvpPlayer.getNamePresence();
                var pl = {playfabid: PvpPlayer.mPlayFabId, name: PvpPlayer.mFullname
                    , heroes: heroes, name_info: NameDataInfo, gc_id: GameCenterId, gplus: GooglePlusData };
                players.push(pl);
            }
        }
    }

    return { result: { "players": players } };
}
//Gets tournament state and title_data for tournament
handlers.getTournamentData = function(args) {

	// Read title data
  	var TitleData = server.GetTitleData({Keys:[CONST_KEY_TITLE_DATA_KEY_CURRENT_CLIENT_VERSION]});
  	var ClientVersionData = {};
  	if ( isObject(TitleData) && ("Data" in TitleData) && isObject(TitleData["Data"]) && ( CONST_KEY_TITLE_DATA_KEY_CURRENT_CLIENT_VERSION in TitleData["Data"] ) )
  	{
      	ClientVersionData = JSON.parse(TitleData["Data"][CONST_KEY_TITLE_DATA_KEY_CURRENT_CLIENT_VERSION]);
  	}
  	// Read title internal data
   	var TitleInternalData = server.GetTitleInternalData({Keys:[CONST_KEY_INTERNAL_TITLE_DATA_KEY_CURRENT_TOURNAMENT, CONST_KEY_INTERNAL_TITLE_DATA_KEY_TOURNAMENT_ENEMIES, CONST_KEY_INTERNAL_TITLE_DATA_KEY_TOURNAMENT_CONSTANTS]});
	var TournamentData = {};
    var EnemiesData = {};
	var ConstantsData = {};
  	if ( isObject(TitleInternalData) && ("Data" in TitleInternalData) && isObject(TitleInternalData["Data"]) && ( CONST_KEY_INTERNAL_TITLE_DATA_KEY_CURRENT_TOURNAMENT in TitleInternalData["Data"] ) && ( CONST_KEY_INTERNAL_TITLE_DATA_KEY_TOURNAMENT_ENEMIES in TitleInternalData["Data"] ) && ( CONST_KEY_INTERNAL_TITLE_DATA_KEY_TOURNAMENT_CONSTANTS in TitleInternalData["Data"] ) )
  	{
      	TournamentData = JSON.parse(TitleInternalData["Data"][CONST_KEY_INTERNAL_TITLE_DATA_KEY_CURRENT_TOURNAMENT]);
        EnemiesData = JSON.parse(TitleInternalData["Data"][CONST_KEY_INTERNAL_TITLE_DATA_KEY_TOURNAMENT_ENEMIES]);
        ConstantsData = JSON.parse(TitleInternalData["Data"][CONST_KEY_INTERNAL_TITLE_DATA_KEY_TOURNAMENT_CONSTANTS]);

      	if ( isObject(TournamentData) && ("tid" in TournamentData) && ("count_checkpoints" in TournamentData)
            && ("checkpoint_timeout" in TournamentData) && ("battle_timeout" in TournamentData)
            && ("start_timestamp" in TournamentData) && ("end_timestamp" in TournamentData))
        {
          	// Check tournament presence at user's data
          	var User = new cUser(currentPlayerId,"","");
			User.readDbFields([CONST_KEY_SERVER_FIELD_TOURNAMENT_DATA]);
			if ( User.isInitedSuccessfully() )
			{
              	var TempCheckpoints = false;//False means that checkpoints will be generated automatically in tournament class
              	var NeedUserSave = true;
              	if ( isObject(User.mDbFields[CONST_KEY_SERVER_FIELD_TOURNAMENT_DATA] )
                    && ("tid" in User.mDbFields[CONST_KEY_SERVER_FIELD_TOURNAMENT_DATA]) )
                {
                  	if ( User.mDbFields[CONST_KEY_SERVER_FIELD_TOURNAMENT_DATA]["tid"] == TournamentData["tid"]
                        && ("checkpoints" in User.mDbFields[CONST_KEY_SERVER_FIELD_TOURNAMENT_DATA]) )
                    {
                      	TempCheckpoints = User.mDbFields[CONST_KEY_SERVER_FIELD_TOURNAMENT_DATA]["checkpoints"];// Not empty checkpoints means that we have saved progress for them
	                    NeedUserSave = false;
                    }
                }
            	var Tournament = new cTournament( TournamentData["tid"],TournamentData["count_checkpoints"],TournamentData["battle_timeout"]
                                                 ,TournamentData["checkpoint_timeout"],TournamentData["start_timestamp"],TournamentData["end_timestamp"],
                                                 TempCheckpoints);
              	TournamentData["progress"] = Tournament.GetSaveObject();
                if ( NeedUserSave )
                {
                    User.initTournament( Tournament, true );
                }
            }
        }
  	}
  	var LeaderboardData = GetTournamentLeaderboard(false);
	if ( LeaderboardData.is_success )
    {
    	LeaderboardData = LeaderboardData["LeaderboardData"];
    }
    else
    {
    	return getError(CONST_ERROR_CODE_LOGICAL_ERROR, "Table data get!");
    }
  	//Get mine leaderboard data
    var LeaderboardDataMine = GetTournamentLeaderboard(true);
    if ( LeaderboardDataMine.is_success )
    {
		LeaderboardDataMine = LeaderboardDataMine["LeaderboardData"];
    }
    else
    {
    	return getError(CONST_ERROR_CODE_LOGICAL_ERROR, "Table mine data get!");
    }

  	return {ClientVersion:ClientVersionData, LeaderboardData:LeaderboardData, LeaderboardDataMine: LeaderboardDataMine, CurrentTournament:TournamentData, Enemies: EnemiesData, Constants: ConstantsData};
}
//Starts checkpoint from input data
//Input: checkpoint_id(string) - represents checkpoint id
handlers.startCheckpoint = function(args) {
    var CheckpointId = 0;
  	//  Check input params
  	if ( ("checkpoint_id" in args) && isString(args["checkpoint_id"]) )
    {
        CheckpointId = args["checkpoint_id"];
    }
    else
    {
		return getError(CONST_ERROR_CODE_BAD_INPUT_DATA, "Bad input data");
    }
  	// Read title internal data
   	var TitleInternalData = server.GetTitleInternalData({Keys:[CONST_KEY_INTERNAL_TITLE_DATA_KEY_CURRENT_TOURNAMENT]});
	var TournamentData = {};
  	if ( isObject(TitleInternalData) && ("Data" in TitleInternalData) && isObject(TitleInternalData["Data"]) && ( CONST_KEY_INTERNAL_TITLE_DATA_KEY_CURRENT_TOURNAMENT in TitleInternalData["Data"] ) )
  	{
      	TournamentData = JSON.parse(TitleInternalData["Data"][CONST_KEY_INTERNAL_TITLE_DATA_KEY_CURRENT_TOURNAMENT]);

      	if ( isObject(TournamentData) && ("tid" in TournamentData) && ("count_checkpoints" in TournamentData)
            && ("checkpoint_timeout" in TournamentData) && ("battle_timeout" in TournamentData)
            && ("start_timestamp" in TournamentData) && ("end_timestamp" in TournamentData))
        {
          	// Check tournament presence at user's data
          	var User = new cUser(currentPlayerId,"","");
			User.readDbFields([CONST_KEY_SERVER_FIELD_TOURNAMENT_DATA]);
			if ( User.isInitedSuccessfully() )
			{
              	var TempCheckpoints = false;//False means that checkpoints will be generated automatically in tournament class
              	if ( isObject(User.mDbFields[CONST_KEY_SERVER_FIELD_TOURNAMENT_DATA] )
                    && ("tid" in User.mDbFields[CONST_KEY_SERVER_FIELD_TOURNAMENT_DATA]) )
                {
                  	if ( User.mDbFields[CONST_KEY_SERVER_FIELD_TOURNAMENT_DATA]["tid"] == TournamentData["tid"]
                        && ("checkpoints" in User.mDbFields[CONST_KEY_SERVER_FIELD_TOURNAMENT_DATA]) )// Good init data
                    {
                      	TempCheckpoints = User.mDbFields[CONST_KEY_SERVER_FIELD_TOURNAMENT_DATA]["checkpoints"];// Not empty checkpoints means that we have saved progress for them
                        var Tournament = new cTournament( TournamentData["tid"],TournamentData["count_checkpoints"],TournamentData["battle_timeout"]
                                                 ,TournamentData["checkpoint_timeout"],TournamentData["start_timestamp"],TournamentData["end_timestamp"],
                                                 TempCheckpoints);
                        var ResStart = Tournament.startCheckpoint(CheckpointId);
                        if ( ResStart.is_success )//Save all data
                        {
                            TournamentData["progress"] = Tournament.GetSaveObject();
		                    User.initTournament( Tournament, true );
                          	var LeaderboardData = GetTournamentLeaderboard(false);
                            if ( LeaderboardData.is_success )
                            {
                                LeaderboardData = LeaderboardData["LeaderboardData"];
                            }
                          	else
                            {
                                return getError(CONST_ERROR_CODE_LOGICAL_ERROR, "Table data get!");
                            }
                          	//Get mine leaderboard data
                          	var LeaderboardDataMine = GetTournamentLeaderboard(true);
                            if ( LeaderboardDataMine.is_success )
                            {
                                LeaderboardDataMine = LeaderboardDataMine["LeaderboardData"];
                            }
                          	else
                            {
                                return getError(CONST_ERROR_CODE_LOGICAL_ERROR, "Table mine data get!");
                            }

                            return {CurrentTournament:TournamentData, LeaderboardData:LeaderboardData, LeaderboardDataMine: LeaderboardDataMine, is_success:true};
                        }
                        else
                        {
							return getError(ResStart.code, "Logical error");
                        }
                    }
                    else
                    {
                        return getError(CONST_ERROR_CODE_TOURNAMENT_IS_NOT_READY, "Bad data on server");
                    }
                }
            }
        }
  	}
  	return getError(CONST_ERROR_CODE_LOGICAL_ERROR, "Unknown error!");
}
//Starts checkpoint from input data
//Input: checkpoint_id(string) - represents checkpoint id, points(int) - represents checkpoint id
handlers.scoreCheckpoint = function(args) {
    var CheckpointId = 0;
	var Points = 0;
  	//  Check input params
  	if ( ("checkpoint_id" in args) && isString(args["checkpoint_id"]) && ("points" in args) && Number.isInteger(args["points"]) )
    {
        CheckpointId = args["checkpoint_id"];
      	Points = args["points"];
    }
    else
    {
		return getError(CONST_ERROR_CODE_BAD_INPUT_DATA, "Bad input data");
    }
  	// Read title internal data
   	var TitleInternalData = server.GetTitleInternalData({Keys:[CONST_KEY_INTERNAL_TITLE_DATA_KEY_CURRENT_TOURNAMENT]});
	var TournamentData = {};
  	if ( isObject(TitleInternalData) && ("Data" in TitleInternalData) && isObject(TitleInternalData["Data"]) && ( CONST_KEY_INTERNAL_TITLE_DATA_KEY_CURRENT_TOURNAMENT in TitleInternalData["Data"] ) )
  	{
      	TournamentData = JSON.parse(TitleInternalData["Data"][CONST_KEY_INTERNAL_TITLE_DATA_KEY_CURRENT_TOURNAMENT]);

      	if ( isObject(TournamentData) && ("tid" in TournamentData) && ("count_checkpoints" in TournamentData)
            && ("checkpoint_timeout" in TournamentData) && ("battle_timeout" in TournamentData)
            && ("start_timestamp" in TournamentData) && ("end_timestamp" in TournamentData))
        {
          	// Check tournament presence at user's data
          	var User = new cUser(currentPlayerId,"","");
			User.readDbFields([CONST_KEY_SERVER_FIELD_TOURNAMENT_DATA]);
			if ( User.isInitedSuccessfully() )
			{
              	var TempCheckpoints = false;//False means that checkpoints will be generated automatically in tournament class
              	if ( isObject(User.mDbFields[CONST_KEY_SERVER_FIELD_TOURNAMENT_DATA] )
                    && ("tid" in User.mDbFields[CONST_KEY_SERVER_FIELD_TOURNAMENT_DATA]) )
                {
                  	if ( User.mDbFields[CONST_KEY_SERVER_FIELD_TOURNAMENT_DATA]["tid"] == TournamentData["tid"]
                        && ("checkpoints" in User.mDbFields[CONST_KEY_SERVER_FIELD_TOURNAMENT_DATA]) )// Good init data
                    {
                      	TempCheckpoints = User.mDbFields[CONST_KEY_SERVER_FIELD_TOURNAMENT_DATA]["checkpoints"];// Not empty checkpoints means that we have saved progress for them
                        var Tournament = new cTournament( TournamentData["tid"],TournamentData["count_checkpoints"],TournamentData["battle_timeout"]
                                                 ,TournamentData["checkpoint_timeout"],TournamentData["start_timestamp"],TournamentData["end_timestamp"],
                                                 TempCheckpoints);
                        var ResStart = Tournament.scoreCheckpoint(CheckpointId, Points);
                        if ( ResStart.is_success )//Save to leaderboard and then all other data
                        {

                          	server.UpdatePlayerStatistics({	PlayFabId: currentPlayerId,		Statistics: [{
                                                  "StatisticName": CONST_KEY_STATISTIC_ACTIVE_TOURNAMENT,
                                                  "Value": Tournament.mTotalPoints
//                              					  ,"Version": 3
                                              }]
                                          });

                            TournamentData["progress"] = Tournament.GetSaveObject();
		                    User.initTournament( Tournament, true );
                          	var LeaderboardData = GetTournamentLeaderboard(false);
                            if ( LeaderboardData.is_success )
                            {
                                LeaderboardData = LeaderboardData["LeaderboardData"];
                            }
                          	else
                            {
                                return getError(CONST_ERROR_CODE_LOGICAL_ERROR, "Table data get!");
                            }
                          	//Get mine leaderboard data
                          	var LeaderboardDataMine = GetTournamentLeaderboard(true);
                            if ( LeaderboardDataMine.is_success )
                            {
                                LeaderboardDataMine = LeaderboardDataMine["LeaderboardData"];
                            }
                          	else
                            {
                                return getError(CONST_ERROR_CODE_LOGICAL_ERROR, "Table mine data get!");
                            }

                            return {CurrentTournament:TournamentData, LeaderboardData:LeaderboardData, LeaderboardDataMine: LeaderboardDataMine, is_success:true};
                        }
                        else
                        {
							return getError(ResStart.code, "Logical error");
                        }
                    }
                    else
                    {
                        return getError(CONST_ERROR_CODE_TOURNAMENT_IS_NOT_READY, "Bad data on server");
                    }
                }
            }
        }
  	}
  	return getError(CONST_ERROR_CODE_LOGICAL_ERROR, "Unknown error!");
}
//Starts checkpoint from input data
//Input: checkpoint_id(string) - represents checkpoint id
handlers.advertizeCheckpoint = function(args) {
    var CheckpointId = 0;
  	//  Check input params
  	if ( ("checkpoint_id" in args) && isString(args["checkpoint_id"]) )
    {
        CheckpointId = args["checkpoint_id"];
    }
    else
    {
		return getError(CONST_ERROR_CODE_BAD_INPUT_DATA, "Bad input data");
    }
  	// Read title internal data
   	var TitleInternalData = server.GetTitleInternalData({Keys:[CONST_KEY_INTERNAL_TITLE_DATA_KEY_CURRENT_TOURNAMENT, CONST_KEY_INTERNAL_TITLE_DATA_KEY_TOURNAMENT_CONSTANTS]});
	var TournamentData = {};
	var ConstantsData = {};
  	if ( isObject(TitleInternalData) && ("Data" in TitleInternalData) && isObject(TitleInternalData["Data"]) && ( CONST_KEY_INTERNAL_TITLE_DATA_KEY_CURRENT_TOURNAMENT in TitleInternalData["Data"] ) && ( CONST_KEY_INTERNAL_TITLE_DATA_KEY_TOURNAMENT_CONSTANTS in TitleInternalData["Data"] ) )
  	{
      	TournamentData = JSON.parse(TitleInternalData["Data"][CONST_KEY_INTERNAL_TITLE_DATA_KEY_CURRENT_TOURNAMENT]);
      	ConstantsData = JSON.parse(TitleInternalData["Data"][CONST_KEY_INTERNAL_TITLE_DATA_KEY_TOURNAMENT_CONSTANTS]);

      	if ( isObject(TournamentData) && ("tid" in TournamentData) && ("count_checkpoints" in TournamentData)
            && ("checkpoint_timeout" in TournamentData) && ("battle_timeout" in TournamentData)
            && ("start_timestamp" in TournamentData) && ("end_timestamp" in TournamentData)
	        && isObject(ConstantsData) && ("advertisment_skip" in ConstantsData)
           )
        {
          	// Check tournament presence at user's data
          	var User = new cUser(currentPlayerId,"","");
			User.readDbFields([CONST_KEY_SERVER_FIELD_TOURNAMENT_DATA]);
			if ( User.isInitedSuccessfully() )
			{
              	var TempCheckpoints = false;//False means that checkpoints will be generated automatically in tournament class
              	if ( isObject(User.mDbFields[CONST_KEY_SERVER_FIELD_TOURNAMENT_DATA] )
                    && ("tid" in User.mDbFields[CONST_KEY_SERVER_FIELD_TOURNAMENT_DATA]) )
                {
                  	if ( User.mDbFields[CONST_KEY_SERVER_FIELD_TOURNAMENT_DATA]["tid"] == TournamentData["tid"]
                        && ("checkpoints" in User.mDbFields[CONST_KEY_SERVER_FIELD_TOURNAMENT_DATA]) )// Good init data
                    {
                      	TempCheckpoints = User.mDbFields[CONST_KEY_SERVER_FIELD_TOURNAMENT_DATA]["checkpoints"];// Not empty checkpoints means that we have saved progress for them
                        var Tournament = new cTournament( TournamentData["tid"],TournamentData["count_checkpoints"],TournamentData["battle_timeout"]
                                                 ,TournamentData["checkpoint_timeout"],TournamentData["start_timestamp"],TournamentData["end_timestamp"],
                                                 TempCheckpoints);
                        var ResStart = Tournament.advertizeCheckpoint(CheckpointId, ConstantsData["advertisment_skip"]);
                        if ( ResStart.is_success )//Save all data
                        {
                            TournamentData["progress"] = Tournament.GetSaveObject();
		                    User.initTournament( Tournament, true );
                          	var LeaderboardData = GetTournamentLeaderboard(false);
                            if ( LeaderboardData.is_success )
                            {
                                LeaderboardData = LeaderboardData["LeaderboardData"];
                            }
                          	else
                            {
                                return getError(CONST_ERROR_CODE_LOGICAL_ERROR, "Table data get!");
                            }
                          	//Get mine leaderboard data
                          	var LeaderboardDataMine = GetTournamentLeaderboard(true);
                            if ( LeaderboardDataMine.is_success )
                            {
                                LeaderboardDataMine = LeaderboardDataMine["LeaderboardData"];
                            }
                          	else
                            {
                                return getError(CONST_ERROR_CODE_LOGICAL_ERROR, "Table mine data get!");
                            }

                            return {CurrentTournament:TournamentData, LeaderboardData:LeaderboardData, LeaderboardDataMine: LeaderboardDataMine, is_success:true};
                        }
                        else
                        {
							return getError(ResStart.code, "Logical error");
                        }
                    }
                    else
                    {
                        return getError(CONST_ERROR_CODE_TOURNAMENT_IS_NOT_READY, "Bad data on server");
                    }
                }
            }
        }
  	}
  	return getError(CONST_ERROR_CODE_LOGICAL_ERROR, "Unknown error!");
}
//Starts checkpoint from input data
//Input: checkpoint_id(string) - represents checkpoint id
handlers.unlockCheckpoint = function(args) {
    var CheckpointId = 0;
  	//  Check input params
  	if ( ("checkpoint_id" in args) && isString(args["checkpoint_id"]) )
    {
        CheckpointId = args["checkpoint_id"];
    }
    else
    {
		return getError(CONST_ERROR_CODE_BAD_INPUT_DATA, "Bad input data");
    }
  	// Read title internal data
   	var TitleInternalData = server.GetTitleInternalData({Keys:[CONST_KEY_INTERNAL_TITLE_DATA_KEY_CURRENT_TOURNAMENT]});
	var TournamentData = {};
	var ConstantsData = {};
  	if ( isObject(TitleInternalData) && ("Data" in TitleInternalData) && isObject(TitleInternalData["Data"]) && ( CONST_KEY_INTERNAL_TITLE_DATA_KEY_CURRENT_TOURNAMENT in TitleInternalData["Data"] ) )
  	{
      	TournamentData = JSON.parse(TitleInternalData["Data"][CONST_KEY_INTERNAL_TITLE_DATA_KEY_CURRENT_TOURNAMENT]);

      	if ( isObject(TournamentData) && ("tid" in TournamentData) && ("count_checkpoints" in TournamentData)
            && ("checkpoint_timeout" in TournamentData) && ("battle_timeout" in TournamentData)
            && ("start_timestamp" in TournamentData) && ("end_timestamp" in TournamentData)
           )
        {
          	// Check tournament presence at user's data
          	var User = new cUser(currentPlayerId,"","");
			User.readDbFields([CONST_KEY_SERVER_FIELD_TOURNAMENT_DATA]);
			if ( User.isInitedSuccessfully() )
			{
              	var TempCheckpoints = false;//False means that checkpoints will be generated automatically in tournament class
              	if ( isObject(User.mDbFields[CONST_KEY_SERVER_FIELD_TOURNAMENT_DATA] )
                    && ("tid" in User.mDbFields[CONST_KEY_SERVER_FIELD_TOURNAMENT_DATA]) )
                {
                  	if ( User.mDbFields[CONST_KEY_SERVER_FIELD_TOURNAMENT_DATA]["tid"] == TournamentData["tid"]
                        && ("checkpoints" in User.mDbFields[CONST_KEY_SERVER_FIELD_TOURNAMENT_DATA]) )// Good init data
                    {
                      	TempCheckpoints = User.mDbFields[CONST_KEY_SERVER_FIELD_TOURNAMENT_DATA]["checkpoints"];// Not empty checkpoints means that we have saved progress for them
                        var Tournament = new cTournament( TournamentData["tid"],TournamentData["count_checkpoints"],TournamentData["battle_timeout"]
                                                 ,TournamentData["checkpoint_timeout"],TournamentData["start_timestamp"],TournamentData["end_timestamp"],
                                                 TempCheckpoints);
                        var ResStart = Tournament.unlockCheckpoint(CheckpointId);
                        if ( ResStart.is_success )//Save all data
                        {
                            TournamentData["progress"] = Tournament.GetSaveObject();
		                    User.initTournament( Tournament, true );

                          	var LeaderboardData = GetTournamentLeaderboard(false);
                            if ( LeaderboardData.is_success )
                            {
                                LeaderboardData = LeaderboardData["LeaderboardData"];
                            }
                          	else
                            {
                                return getError(CONST_ERROR_CODE_LOGICAL_ERROR, "Table data get!");
                            }
                          	//Get mine leaderboard data
                          	var LeaderboardDataMine = GetTournamentLeaderboard(true);
                            if ( LeaderboardDataMine.is_success )
                            {
                                LeaderboardDataMine = LeaderboardDataMine["LeaderboardData"];
                            }
                          	else
                            {
                                return getError(CONST_ERROR_CODE_LOGICAL_ERROR, "Table mine data get!");
                            }

                            return {CurrentTournament:TournamentData, LeaderboardData:LeaderboardData, LeaderboardDataMine: LeaderboardDataMine, is_success:true};
                        }
                        else
                        {
							return getError(ResStart.code, "Logical error");
                        }
                    }
                    else
                    {
                        return getError(CONST_ERROR_CODE_TOURNAMENT_IS_NOT_READY, "Bad data on server");
                    }
                }
            }
        }
  	}
  	return getError(CONST_ERROR_CODE_LOGICAL_ERROR, "Unknown error!");
}
//-----------
function GetTournamentLeaderboard(isMine)
{
  	var LeaderboardData = null;
  	if ( isMine )
    {
      	LeaderboardData =  server.GetLeaderboardAroundUser({
            StatisticName: CONST_KEY_STATISTIC_ACTIVE_TOURNAMENT,
            PlayFabId: currentPlayerId,
            MaxResultsCount: 1,
            ProfileConstraints: {"ShowDisplayName":true, "ShowLinkedAccounts":true}
        });
    }
	else
    {
        LeaderboardData =  server.GetLeaderboard({
            StatisticName: CONST_KEY_STATISTIC_ACTIVE_TOURNAMENT,
            StartPosition: 0,
            MaxResultsCount: 20,
            ProfileConstraints: {"ShowDisplayName":true, "ShowLinkedAccounts":true}
        });
    }

	if ( isObject( LeaderboardData ) && ( "Leaderboard" in LeaderboardData ) && isArray(LeaderboardData["Leaderboard"]) )
	{
      	var TempLeaderboard = LeaderboardData["Leaderboard"];
      	for ( var i in TempLeaderboard )
        {
        	if ( isObject(TempLeaderboard[i]) && ("Profile" in TempLeaderboard[i]) && ("LinkedAccounts" in TempLeaderboard[i]["Profile"]) )
            {//Find facebook and delete Profile property to hide private info
              	var Links = TempLeaderboard[i]["Profile"]["LinkedAccounts"];
	            delete TempLeaderboard[i]["Profile"]; //Remove private data
              	if ( isArray(Links) )
                {
                  	for ( var j in Links )
                    {
                      	if ( isObject(Links[j]) && ("Platform" in Links[j]) && (Links[j]["Platform"] == "Facebook")
                           && ("PlatformUserId" in Links[j]) && ("Username" in Links[j]) )//Get facebook data
                        {
                          	TempLeaderboard[i]["FacebookId"] = Links[j]["PlatformUserId"];
                          	TempLeaderboard[i]["Name"] = Links[j]["Username"];
                        }
                    }
                }
            }
        }
        return {is_success:true, isMine:isMine, LeaderboardData:TempLeaderboard};
    }
  	else
    {
  		return {is_success:false};
    }
}
//Gets leaderboard data of current tournament
handlers.getTournamentLeaderboard = function(args) {
  	var isMine = false;
  	if ( ("isMine" in args) && args["isMine"] )
    {
      	isMine = true;
    }
  	var LeaderboardData = GetTournamentLeaderboard(isMine);
    if ( LeaderboardData.is_success )
  	{
      	return LeaderboardData;
  	}
  	else
    {
  		return getError(CONST_ERROR_CODE_LOGICAL_ERROR, "Unknown error!");
    }
}
// This method resets leaderboard for tournament. Blocks by checking password from outside
handlers.resetActiveLeaderboard = function (args) {
		// Check access password presence
		if ( isObject(args)
				&& (CONST_SYSTEM_PASSW_CRON_TASKS_KEY in args) && (args[CONST_SYSTEM_PASSW_CRON_TASKS_KEY] == CONST_SYSTEM_PASSW_CRON_TASKS)
				&& ("sdkey" in args) && isString(args["sdkey"])
				&& ("titleid" in args) && isString(args["titleid"])
			 )
		{
		    var headers = {
		      "X-SecretKey": args.sdkey // development secret key of App in Playfab
		    };

		    var body = {
		        "StatisticName": CONST_KEY_STATISTIC_ACTIVE_TOURNAMENT
		    };

		    var url = "https://"+args["titleid"]+".playfabapi.com/Admin/IncrementPlayerStatisticVersion";
		    var content = JSON.stringify(body);
		    var httpMethod = "post";
		    var contentType = "application/json";

		    // The pre-defined http object makes synchronous HTTP requests
		    var response = http.request(url, httpMethod, content, contentType, headers);
		    return { responseContent: response, is_success:true };
		}
		else
		{
				return { is_success:false };
		}
};
//--------------------
function getRandomFromArrayExceptOneValue( arr, exceptValue )
{
		if ( arr.length == 1 )
		{
				return arr[0];
		}
		if ( exceptValue != null )
		{
				var indexExcept = arr.indexOf(exceptValue);
				if (indexExcept > -1)
				{
						arr.splice(indexExcept, 1);
				}
		}
		if ( arr.length > 0 )
		{
				return arr[Math.floor(Math.random()*arr.length)];
		}
		return null;
}
//--------------------
//Wont work without secret code
handlers.cronStartTournament = function(args) {
		if ( isObject(args)
				&& (CONST_SYSTEM_PASSW_CRON_TASKS_KEY in args) && (args[CONST_SYSTEM_PASSW_CRON_TASKS_KEY] == CONST_SYSTEM_PASSW_CRON_TASKS)
			 )
		{
				// Read title internal data
		   	var TitleInternalData = server.GetTitleInternalData({Keys:[CONST_KEY_INTERNAL_TITLE_DATA_KEY_TOURNAMENT_PR_RANDOMED, CONST_KEY_INTERNAL_TITLE_DATA_KEY_TOURNAMENT_MAPS, CONST_KEY_INTERNAL_TITLE_DATA_KEY_TOURNAMENT_REWARDS,CONST_KEY_INTERNAL_TITLE_DATA_KEY_TOURNAMENT_CONSTANTS]});
				var PreviouslyRandomedData = {};
		    var MapsData = [];
				var RewardsData = {};
				var ConstantsData = {};
		  	if ( isObject(TitleInternalData) && ("Data" in TitleInternalData) && isObject(TitleInternalData["Data"]) && ( CONST_KEY_INTERNAL_TITLE_DATA_KEY_TOURNAMENT_PR_RANDOMED in TitleInternalData["Data"])
				&& ( CONST_KEY_INTERNAL_TITLE_DATA_KEY_TOURNAMENT_MAPS in TitleInternalData["Data"] ) && ( CONST_KEY_INTERNAL_TITLE_DATA_KEY_TOURNAMENT_REWARDS in TitleInternalData["Data"] ) && ( CONST_KEY_INTERNAL_TITLE_DATA_KEY_TOURNAMENT_CONSTANTS in TitleInternalData["Data"] )
						)
		  	{
						PreviouslyRandomedData = JSON.parse(TitleInternalData["Data"][CONST_KEY_INTERNAL_TITLE_DATA_KEY_TOURNAMENT_PR_RANDOMED]);
						MapsData = JSON.parse(TitleInternalData["Data"][CONST_KEY_INTERNAL_TITLE_DATA_KEY_TOURNAMENT_MAPS]);
						RewardsData = JSON.parse(TitleInternalData["Data"][CONST_KEY_INTERNAL_TITLE_DATA_KEY_TOURNAMENT_REWARDS]);
						ConstantsData = JSON.parse(TitleInternalData["Data"][CONST_KEY_INTERNAL_TITLE_DATA_KEY_TOURNAMENT_CONSTANTS]);

						if ( isObject(PreviouslyRandomedData) && isArray(MapsData) && isObject(RewardsData) && isObject(ConstantsData)
								)
						{
								if ( isObject(ConstantsData) && ("count_checkpoints" in ConstantsData) && ("start_tournament_hours" in ConstantsData) && ("start_tournament_minutes" in ConstantsData) && ("start_tournament_offset" in ConstantsData)
										&& ("checkpoint_timeout" in ConstantsData) && ("battle_timeout" in ConstantsData) && ("tournament_duration" in ConstantsData) && ("give_reward_duration" in ConstantsData)
									)
								{
										StartTournamentHours = ConstantsData["start_tournament_hours"];
										StartTournamentMinutes = ConstantsData["start_tournament_minutes"];
										StartTournamentOffset = ConstantsData["start_tournament_offset"];//Offset from start time in seconds
										TournamentDuration = ConstantsData["tournament_duration"];
										GiveRewardDuration = ConstantsData["give_reward_duration"];
										//Generate random values for next tournament
										var PreviousMap = null;
										var PreviousRewardSlot = null;
										var PreviousId = null;
										var NewId = "t1";
										var NewMap = null;
										var NewRewardSlot = null;
										var RewardsKeys = Object.keys(RewardsData);
										if ( ("map" in PreviouslyRandomedData) )
										{
												PreviousMap = PreviouslyRandomedData["map"];
										}
										if ( ("reward" in PreviouslyRandomedData) )
										{
												PreviousRewardSlot = PreviouslyRandomedData["reward"];
										}
										if ( ("tid" in PreviouslyRandomedData) )
										{
												PreviousId = PreviouslyRandomedData["tid"];
												var NumId = parseInt(PreviousId.substring(1));
												NewId = Number.isInteger(NumId) ? "t"+(NumId+1) : NewId;
										}
										NewMap = getRandomFromArrayExceptOneValue(MapsData,PreviousMap);
										NewRewardSlot = getRandomFromArrayExceptOneValue(RewardsKeys,PreviousRewardSlot);
										var GeneratedTimestamps = getTimestampsForTournamentFromTodayByHM( StartTournamentHours, StartTournamentMinutes, StartTournamentOffset, TournamentDuration, GiveRewardDuration );

										//Update current tournament and new generated fields
										PreviouslyRandomedData = {map:NewMap, reward:NewRewardSlot, tid:NewId};
										CurrentTournament = {tid: NewId, count_checkpoints:ConstantsData["count_checkpoints"], battle_timeout:ConstantsData["battle_timeout"],
										 checkpoint_timeout:ConstantsData["checkpoint_timeout"], map_id: NewMap, reward: RewardsData[NewRewardSlot]
										 , start_timestamp: GeneratedTimestamps.StartTime,end_timestamp: GeneratedTimestamps.EndTime, reward_timestamp:GeneratedTimestamps.RewardTime};

										server.SetTitleInternalData({Key:CONST_KEY_INTERNAL_TITLE_DATA_KEY_TOURNAMENT_PR_RANDOMED,Value:JSON.stringify(PreviouslyRandomedData)});
										server.SetTitleInternalData({Key:CONST_KEY_INTERNAL_TITLE_DATA_KEY_CURRENT_TOURNAMENT,Value:JSON.stringify(CurrentTournament)});

										return {is_success:true,RewardsKeys:RewardsKeys,MapsData:MapsData, NewMap:NewMap, NewRewardSlot:NewRewardSlot,NewId:NewId,PreviousId:PreviousId};
								}
								else
								{
										return { is_success:false, reason: "Bad constants"};
								}
						}
						else
						{
								return { is_success:false, reason: "Bad input data on server"};
						}
				}
				else
				{
						return { is_success:false, reason: "Not enough data on server"};
				}
		}
		else
		{
				return { is_success:false, reason: "Bad code" };
		}
}
//-------------------------
//Gives several gifts to one user per 2 subrequests(read/write)
function giveTournamentReward(args) {
    var result = [];
    if ( isObject( args ) && ( "friendPlayfabId" in args )  && ( "senderFbId" in args ) && ( "networkType" in args ) && ( "rewards" in args ) && isObject(args["rewards"]) )
    {

        var Gifts = args["rewards"];
				var FriendUser = new cUser(args["friendPlayfabId"],"","");
				FriendUser.readDbFields([CONST_KEY_SERVER_FIELD_GIFTS_RECEIVED]);
				var GiftsKeys = {"stone":"Stone","wood":"Wood","gold":"Gold","energy":"Energy","gems":"Gems","scrolls":"Training"};
				for ( var k in Gifts  )
				{
						if ( k in GiftsKeys )
						{
								var IncomingGift = new cGift( args["senderFbId"], args["networkType"], GiftsKeys[k], Gifts[k], -1, GiftsKeys[k] );
								FriendUser.addNewGift(IncomingGift);
						}
				}

        FriendUser.saveDbFields([CONST_KEY_SERVER_FIELD_GIFTS_RECEIVED]);
        return {is_success:true};
    }
    else
    {
        return {is_success:false};
    }
};
//--------------------
//Wont work without secret code
handlers.cronRewardTournament = function(args) {
		if ( isObject(args)
				&& (CONST_SYSTEM_PASSW_CRON_TASKS_KEY in args) && (args[CONST_SYSTEM_PASSW_CRON_TASKS_KEY] == CONST_SYSTEM_PASSW_CRON_TASKS)
			 )
		{
				//Doesn't create new tournament from this cron task
				var BlockResetAndStart = ((CONST_SYSTEM_CRON_BLOCK_RESET_AND_START_NEW in args) && (args[CONST_SYSTEM_CRON_BLOCK_RESET_AND_START_NEW] == true)) ? true : false;
				// Read title internal data
		   	var TitleInternalData = server.GetTitleInternalData({Keys:[CONST_KEY_INTERNAL_TITLE_DATA_KEY_CURRENT_TOURNAMENT]});
				var CurrentTournamentData = {};

		    if ( isObject(TitleInternalData) && ("Data" in TitleInternalData) && isObject(TitleInternalData["Data"]) && ( CONST_KEY_INTERNAL_TITLE_DATA_KEY_CURRENT_TOURNAMENT in TitleInternalData["Data"])
						)
		  	{
						CurrentTournamentData = JSON.parse(TitleInternalData["Data"][CONST_KEY_INTERNAL_TITLE_DATA_KEY_CURRENT_TOURNAMENT]);

						if ( isObject(CurrentTournamentData) && ("reward" in CurrentTournamentData) && isArray(CurrentTournamentData["reward"]))
						{
								RewardsData = CurrentTournamentData["reward"];
								LeaderboardData =  server.GetLeaderboard({
						            StatisticName: CONST_KEY_STATISTIC_ACTIVE_TOURNAMENT,
						            StartPosition: 0,
						            MaxResultsCount: 3,
						        });
								if ( isObject( LeaderboardData ) && ( "Leaderboard" in LeaderboardData ) && isArray((LeaderboardData["Leaderboard"])) )
								{
										var Table = LeaderboardData["Leaderboard"];
										var RewardTable = [];
										var RewardsLen = RewardsData.length;
										for ( var i in Table )
										{
												var Pos = Table[i].Position + 1;
												var RewardsValue = null;
												for ( var j in RewardsData )
												{
														if (("place" in RewardsData[j]))
														{
																var Place = Number.parseInt(RewardsData[j]["place"]);
																if ( Place == Pos )
																{
																		var TempVals = RewardsData[j];
																		delete TempVals["place"];
																		RewardsValue = TempVals;
																		break;
																}
														}
												}
												if ( RewardsValue != null )
												{
														var TempActor = {Pos:Pos, PlayfabId:Table[i].PlayFabId, Reward:RewardsValue};
														RewardTable.push(TempActor);
												}
												else
												{
														return { is_success:false, reason: "Bad place in rewards"};
												}
										}
										for ( var k in RewardTable )
										{
												var GiftObj = {friendPlayfabId:RewardTable[k].PlayfabId, senderFbId:CONST_SYSTEM_ADMIN_GIFT_SENDER_NAME, networkType:"fb", rewards:RewardTable[k].Reward};
												var Res = giveTournamentReward(GiftObj)
												if ( !Res.is_success )
												{
														return { is_success:false, reason: "Bad request at rewarding", RewardTable:RewardTable};
												}
										}

										if ( !BlockResetAndStart )// Requred to reset old leaderboard and start new tournament from this cron task
										{
												var ResetData = handlers["resetActiveLeaderboard"](args);
												if ( ResetData.is_success )
												{
														var StartData = handlers["cronStartTournament"](args);
														if ( StartData.is_success )
														{
																return {is_success:true, reset: ResetData, start: StartData,RewardTable:RewardTable};
														}
														else
														{
																return { is_success:false, reason: StartData,RewardTable:RewardTable};
														}
												}
												else
												{
														return { is_success:false, reason: ResetData,RewardTable:RewardTable};
												}
										}
										else // There is no need to start new tournament from this cron task
										{
												return {is_success:true, reset_and_start_was_blocked:true,RewardTable:RewardTable};
										}
								}
								else
								{
										return { is_success:false, reason: "Bad leaderboard"};
								}
						}
						else
						{
								return { is_success:false, reason: "Bad input data on server"};
						}
				}
				else
				{
						return { is_success:false, reason: "Not enough data on server"};
				}
		}
		else
		{
				return { is_success:false, reason: "Bad code" };
		}
}
//--------------------
//Test method
handlers.testCron = function(args) {
  var res = server.UpdateUserData({
                PlayFabId: "96B9F2D5A62DD521",
                Data: {"test_cron_field":"cron123"}
            });
  handlers["makeHTTPRequest"]({"sdkey":"7MHTHI6WJ681WOB9R3WH91DY1XJRO7DHHMIIF3NF6PUXTZWEKR"});
}
