# Photon Protocol - GPBinaryV16 Packet Structure

This document describes the internal packet structure and enums used by the Photon-based networking protocol, specifically using the GPBinaryV16 serialization format. It’s primarily meant for game networking and real-time multiplayer communication.

---

## 📦 Packet Types

```js
class PacketType {
    static Init = 0;
    static InitResponse = 1;
    static Operation = 2;
    static OperationResponse = 3;
    static Event = 4;
    static Disconnect = 5;
    static InternalOperationRequest = 6;
    static InternalOperationResponse = 7;
    static Message = 8;
    static RawMessage = 9;
}
```

---

## 🧠 Data Types

These types are used to define values inside packets.

```js
class DataType {
    static NullValue = 42;
    static Dictionary = 68;
    static StringArray = 97;
    static Byte = 98;
    static Custom = 99;
    static Double = 100;
    static EventData = 101;
    static Float = 102;
    static Hashtable = 104;
    static Integer = 105;
    static Short = 107;
    static Long = 108;
    static IntegerArray = 110;
    static Bool = 111;
    static OperationResponse = 112;
    static OperationRequest = 113;
    static String = 115;
    static ByteArray = 120;
    static Array = 121;
    static ObjectArray = 122;
}
```

---

## ⚙️ Operation Codes

These codes are used with operation packets to perform tasks such as joining games or authenticating.

```js
class OperationCode {
    static GetGameList = 217;
    static ServerSettings = 218;
    static WebRpc = 219;
    static GetRegions = 220;
    static GetLobbyStats = 221;
    static FindFriends = 222;
    static CancelJoinRandom = 224;
    static JoinRandomGame = 225;
    static JoinGame = 226;
    static CreateGame = 227;
    static LeaveLobby = 228;
    static JoinLobby = 229;
    static Authenticate = 230;
    static AuthenticateOnce = 231;
    static ChangeGroups = 248;
    static ExchangeKeysForEncryption = 250;
    static GetProperties = 251;
    static SetProperties = 252;
    static RaiseEvent = 253;
    static Leave = 254;
    static Join = 255;
}
```

---

## 🚨 Event Codes

Used to describe the type of event in event packets.

```js
class EventCode {
    static AzureNodeInfo = 210;
    static AuthEvent = 223;
    static LobbyStats = 224;
    static AppStats = 226;
    static Match = 227;
    static QueueState = 228;
    static GameListUpdate = 229;
    static GameList = 230;
    static CacheSliceChanged = 250;
    static ErrorInfo = 251;
    static PropertiesChanged = 253;
    static SetProperties = 253;
    static Leave = 254;
    static Join = 255;
}
```

---

## 🔢 Parameter Codes

These are the keys used inside operation and event packet parameter lists.

```js
class ParameterCode {
    static FindFriendsRequestList = 1;
    static FindFriendsResponseOnlineList = 1;
    static FindFriendsOptions = 2;
    static FindFriendsResponseRoomIdList = 2;
    static RoomOptionFlags = 191;
    static EncryptionData = 192;
    static EncryptionMode = 193;
    static CustomInitData = 194;
    static ExpectedProtocol = 195;
    static PluginVersion = 200;
    static PluginName = 201;
    static NickName = 202;
    static MasterClientId = 203;
    static Plugins = 204;
    static CacheSliceIndex = 205;
    static WebRpcReturnMessage = 206;
    static WebRpcReturnCode = 207;
    static AzureMasterNodeId = 208;
    static WebRpcParameters = 208;
    static AzureLocalNodeId = 209;
    static UriPath = 209;
    static AzureNodeInfo = 210;
    static Region = 210;
    static LobbyStats = 211;
    static LobbyType = 212;
    static LobbyName = 213;
    static ClientAuthenticationData = 214;
    static CreateIfNotExists = 215;
    static JoinMode = 215;
    static ClientAuthenticationParams = 216;
    static ClientAuthenticationType = 217;
    static Info = 218;
    static AppVersion = 220;
    static Secret = 221;
    static GameList = 222;
    static MatchMakingType = 223;
    static Position = 223;
    static ApplicationId = 224;
    static UserId = 225;
    static MasterPeerCount = 227;
    static GameCount = 228;
    static PeerCount = 229;
    static Address = 230;
    static ExpectedValues = 231;
    static CheckUserOnJoin = 232;
    static IsComingBack = 233;
    static IsInactive = 233;
    static EventForward = 234;
    static PlayerTTL = 235;
    static EmptyRoomTTL = 236;
    static SuppressRoomEvents = 237;
    static Add = 238;
    static PublishUserId = 239;
    static Remove = 239;
    static Group = 240;
    static CleanupCacheOnLeave = 241;
    static Code = 244;
    static CustomEventContent = 245;
    static Data = 245;
    static ReceiverGroup = 246;
    static Cache = 247;
    static GameProperties = 248;
    static PlayerProperties = 249;
    static Broadcast = 250;
    static Properties = 251;
    static ActorList = 252;
    static TargetActorNr = 253;
    static ActorNr = 254;
    static RoomName = 255;
}
```

---

## 🛰️ Packet Builder Examples

```js
const packet = PhotonPacketBuilder.createRequest(OperationCode.JoinRandomGame)
    .addParam(ParameterCode.NickName, { type: DataType.String, data: "Player123" })
    .addParam(ParameterCode.AppVersion, { type: DataType.String, data: "1.0.0" });

const buffer = packet.toBuffer();
const base64 = packet.toBase64();
const hex = packet.toHex();
```

---

## 📡 Ping Packet Format

```js
const ping = PhotonPacketBuilder.createPing(Date.now(), Date.now());
const base64Ping = ping.toBase64();
```

---

## 🧰 Helper: PhotonPacketBuilder.types

```js
PhotonPacketBuilder.types.string("hello");     // { type: 0x73, data: "hello" }
PhotonPacketBuilder.types.int(123);            // { type: 0x69, data: 123 }
PhotonPacketBuilder.types.bool(true);          // { type: 0x6F, data: true }
PhotonPacketBuilder.types.float(1.23);         // { type: 0x66, data: 1.23 }
PhotonPacketBuilder.types.null();              // { type: 0x2A, data: null }
PhotonPacketBuilder.types.byteArray([1,2,3]);  // { type: 0x78, data: [1, 2, 3] }
```

---

## 🧪 Magic Bytes

- `0xF3` → Main protocol magic
- `0xF0` → Ping packet magic

---

## 🧷 Notes

- All values are serialized in GPBinaryV16 format.
- Order of parameters may matter depending on implementation.
---

## 📁 Exported Module

```js
module.exports = {
    DataType,
    PacketType,
    InternalOperationCode,
    OperationCode,
    EventCode,
    ParameterCode
};
```

---

> Built with ❤️ for reverse engineering multiplayer game protocols.
