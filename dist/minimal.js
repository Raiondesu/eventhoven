(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = global || self, factory(global.eventhoven = {}));
}(this, (function (exports) { 'use strict';

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
  }

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

      return arr2;
    }
  }

  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }

  function _iterableToArray(iter) {
    if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
  }

  function _iterableToArrayLimit(arr, i) {
    if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) {
      return;
    }

    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance");
  }

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance");
  }

  var mapObject = function mapObject(obj, value) {
    return [].concat(_toConsumableArray(Object.keys(obj)), _toConsumableArray(Object.getOwnPropertySymbols(obj))).reduce(function (newObj, key) {
      return newObj[key] = value(key), newObj;
    }, {});
  };

  var eventMap = function eventMap(events) {
    return mapObject(events, function (event) {
      return new Map().set(events[event], function () {});
    });
  };

  var _eventMap;
  var metaEvents = eventMap((_eventMap = {}, _defineProperty(_eventMap, "EMIT", function EMIT(_, _map, _event, _args) {}), _defineProperty(_eventMap, "SUBSCRIBE", function SUBSCRIBE(_, _map, _event, _handler) {}), _defineProperty(_eventMap, "UNSUBSCRIBE", function UNSUBSCRIBE(_, _map, _event, _handler) {}), _eventMap));

  var emit = function emit(eventMap) {
    return function (event) {
      return function () {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        return emitMeta("EMIT")(eventMap, event, args), Promise.all(_toConsumableArray(eventMap[event] || []).map(function (_ref) {
          var _ref2 = _slicedToArray(_ref, 2),
              handler = _ref2[0],
              unsubscribe = _ref2[1];

          return handler && handler.apply(void 0, [{
            event: event,
            unsubscribe: unsubscribe
          }].concat(args));
        }));
      };
    };
  };
  var emitMeta = function emitMeta(event) {
    return function () {
      return (arguments.length <= 0 ? undefined : arguments[0]) !== metaEvents ? emit(metaEvents)(event).apply(void 0, arguments) : Promise.resolve([]);
    };
  };

  var unsubscribe = function unsubscribe(eventMap) {
    return function (event) {
      return function () {
        for (var _len = arguments.length, handlers = new Array(_len), _key = 0; _key < _len; _key++) {
          handlers[_key] = arguments[_key];
        }

        if (event in eventMap) {
          var _iteratorNormalCompletion = true;
          var _didIteratorError = false;
          var _iteratorError = undefined;

          try {
            for (var _iterator = (handlers.length > 0 ? handlers : eventMap[event].keys())[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              var h = _step.value;
              emitMeta("UNSUBSCRIBE")(eventMap, event, h), eventMap[event]["delete"](h);
            }
          } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion && _iterator["return"] != null) {
                _iterator["return"]();
              }
            } finally {
              if (_didIteratorError) {
                throw _iteratorError;
              }
            }
          }
        }
      };
    };
  };
  var off = unsubscribe;

  exports.off = off;
  exports.unsubscribe = unsubscribe;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
