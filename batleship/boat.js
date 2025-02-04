"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Boat = void 0;
var Boat = /** @class */ (function () {
    function Boat(long, dir) {
        this.long = long;
        this.dir = dir;
        this.position = [];
    }
    Object.defineProperty(Boat.prototype, "longB", {
        get: function () {
            return this.long;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Boat.prototype, "dirB", {
        get: function () {
            return this.dir;
        },
        enumerable: false,
        configurable: true
    });
    Boat.prototype.getPosition = function () {
        return __spreadArray([], this.position, true); // Devuelve copia del array original
    };
    Boat.prototype.setposition = function (xE, yE) {
        this.position = [];
        for (var i = 0; i < this.long; i++) {
            var x = xE;
            var y = yE;
            if (this.dir === 'vertical') {
                y += i;
            }
            else if (this.dir === 'horizontal') {
                x += i;
            }
            if (x >= 16 || y >= 16) {
                return false;
            }
            this.position.push({ x: x, y: y, hit: false });
        }
        return true;
    };
    Boat.prototype.getHitsBoats = function (x, y) {
        for (var i = 0; i < this.long; i++) {
            var pos = this.position[i];
            if (pos.x === x && pos.y === y) {
                this.position[i].hit = true;
                console.log("\u00A1Hit! En la posici\u00F3n ".concat(x, ", ").concat(y));
                return ' ◎ ';
            }
        }
        return ' ⍾ ';
    };
    return Boat;
}());
exports.Boat = Boat;
