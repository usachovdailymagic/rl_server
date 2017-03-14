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
		  }
};
//----------------End Value constants---------------------

//----------------Server keys constants---------------------
var CONST_KEY_SERVER_FIELD_GAME_PROGRESS				= "Progress";
var CONST_KEY_SERVER_FIELD_SAVE_OVERVIEW				= "SaveOverview";
var CONST_KEY_SERVER_FIELD_UUID        					= "Uuid";
var CONST_KEY_SERVER_FIELD_SCORE        				= "Score";
var CONST_KEY_SERVER_FIELD_GIFTS_RECEIVED				= "GiftsReceived";
var CONST_KEY_SERVER_FIELD_GIFTS_SENT_TIMESTAMP			= "GiftsSentTime";
var CONST_KEY_SERVER_FIELD_GIFTS_ASK_TIMESTAMP			= "GiftsAskTime";
var CONST_KEY_SERVER_FIELD_GAME_CENTER_ID   			= "GameCenterId";
var CONST_KEY_SERVER_FIELD_GOOGLE_PLUS_DATA   			= "GooglePlusData";
var CONST_KEY_SERVER_FIELD_REDEEM_CODE_DATA   			= "RedeemCodesUsed";
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
var CONST_ERROR_CODE_FRIEND_PROGRESS_AT_HELP_NOT_FOUND	 	        = 3005;
var CONST_ERROR_CODE_BAD_PARAMS_AT_HELP            	 	            = 3006;
var CONST_ERROR_CODE_FRIEND_PROGRESS_AT_HELP_ASKING_NOT_FOUND	 	= 3007;
var CONST_ERROR_CODE_BAD_PARAMS_AT_HELP_ASKING            	 	    = 3008;
var CONST_ERROR_CODE_TOO_EARLY_TO_ASK_THIS_FRIEND            	 	= 3009;
var CONST_ERROR_CODE_GC_LINK_BAD_PARAMS                     	 	= 3010;
var CONST_ERROR_CODE_GOOGLE_LINK_BAD_PARAMS                         = 3011;

// 4XXX Errors for RedeemCode operations
var CONST_ERROR_CODE_BAD_REDEEM_CODE_ID			 		            = 4001;
var CONST_ERROR_CODE_BAD_REDEEM_CODE_SETTINGS	 		            = 4002;
var CONST_ERROR_CODE_LATE_TO_USE_THIS_CODE_INTERVAL		            = 4003;
var CONST_ERROR_CODE_PLAYER_ALREADY_USED_THIS_CODE			        = 4004;
var CONST_ERROR_CODE_REDEEM_REQUEST_BAD_PARAMS				        = 4005;
var CONST_ERROR_CODE_CANNOT_INIT_USER_AT_REDEEM				        = 4006;
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
    return val instanceof String;
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
    User.readDbFields([CONST_KEY_SERVER_FIELD_GAME_PROGRESS, CONST_KEY_SERVER_FIELD_SAVE_OVERVIEW, CONST_KEY_SERVER_FIELD_GIFTS_RECEIVED
        , CONST_KEY_SERVER_FIELD_GIFTS_SENT_TIMESTAMP
        , CONST_KEY_SERVER_FIELD_GIFTS_ASK_TIMESTAMP
        , CONST_KEY_SERVER_FIELD_GAME_CENTER_ID
        , CONST_KEY_SERVER_FIELD_GOOGLE_PLUS_DATA
        ]);
    if ( User.isInitedSuccessfully() )
    {
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
		for (var i = 0; i < leaderboard.Leaderboard.length; i++)
        {
			var player = leaderboard.Leaderboard[i];
			if (player.PlayFabId == currentPlayerId)
            {
//              Request sender is not searching element, pass him
				continue;
			}

//-- START TODO remove this hardcode after testing. This part of code adds players with facebook linked accounts
            if ( i == 0 )
            {
                var PossiblePlayers = ["26A034D4D5C9F0F0","714C003E1ABF156","8CCDCAAB7DEC6F8","3EDB58C3E81D6362"];
                var SelectedId = PossiblePlayers[0];
                if ( currentPlayerId == PossiblePlayers[0] )
                {
                    SelectedId = PossiblePlayers[1];
                }
                player.PlayFabId = SelectedId;
            }
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
