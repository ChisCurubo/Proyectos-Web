"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Batleship = void 0;
var boat_1 = require("./boat");
var readline = require("readline/promises");
var prompt = function (message) { return __awaiter(void 0, void 0, void 0, function () {
    var rl, answer;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                rl = readline.createInterface({
                    input: process.stdin,
                    output: process.stdout,
                });
                return [4 /*yield*/, rl.question(message)];
            case 1:
                answer = _a.sent();
                rl.close();
                return [2 /*return*/, answer];
        }
    });
}); };
var Batleship = /** @class */ (function () {
    function Batleship() {
        var _this = this;
        this.size = 16;
        this.tableroJuego = [];
        this.tableroMaquina = [];
        this.letrasHusky = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        this.tableroBotes = [];
        this.tableroBotesMa = [];
        this.livesMa = 15;
        this.lives = 15;
        this.llenarTableroString = function (matriz) {
            for (var i = 0; i < _this.size; i++) {
                var arrayLlena = [];
                for (var j = 0; j < _this.size; j++) {
                    arrayLlena.push(' . ');
                }
                matriz.push(arrayLlena);
            }
        };
        this.llenarArrayBarcosM = function () {
            var barcosPredefinidos = [
                { longitud: 5, direccion: 'horizontal', x: 0, y: 0 }, // Barco de longitud 5
                { longitud: 4, direccion: 'vertical', x: 2, y: 3 }, // Barco de longitud 4
                { longitud: 3, direccion: 'horizontal', x: 5, y: 6 }, // Barco de longitud 3
                { longitud: 2, direccion: 'vertical', x: 7, y: 9 }, // Barco de longitud 3
                { longitud: 1, direccion: 'horizontal', x: 9, y: 2 } // Barco de longitud 2
            ];
            for (var _i = 0, barcosPredefinidos_1 = barcosPredefinidos; _i < barcosPredefinidos_1.length; _i++) {
                var barco = barcosPredefinidos_1[_i];
                var boat = new boat_1.Boat(barco.longitud, barco.direccion);
                var validPosition = boat.setposition(barco.x, barco.y);
                if (validPosition) {
                    _this.tableroBotesMa.push(boat);
                }
                else {
                    console.error("Error al colocar el barco en ".concat(barco.x, ", ").concat(barco.y));
                }
            }
        };
        this.imprimir_tablero = function (matriz) {
            var base = '  '; // Espacio inicial para alineación
            for (var _i = 0, _a = _this.tableroBotes; _i < _a.length; _i++) {
                var boat = _a[_i];
                for (var _b = 0, _c = boat.getPosition(); _b < _c.length; _b++) {
                    var pos = _c[_b];
                    matriz[pos.x][pos.y] = ' ® ';
                }
            }
            for (var i = 0; i < _this.size; i++) {
                var formattedNumber = i < 10 ? " ".concat(i) : "".concat(i);
                base += " ".concat(formattedNumber, " ");
            }
            console.log(base);
            for (var i = 0; i < _this.size; i++) {
                var vari = _this.letrasHusky[i] + ' ';
                for (var j = 0; j < _this.size; j++) {
                    vari += '|' + matriz[i][j];
                }
                console.log(vari);
            }
        };
        this.imprimirTablerosJuego = function (matriz, matrizMa) {
            var base = '  '; // Espacio inicial para alineación
            var base2 = '  ';
            for (var i = 0; i < _this.size; i++) {
                var formattedNumber = i < 10 ? " ".concat(i) : "".concat(i);
                base += " ".concat(formattedNumber, " ");
                base2 += " ".concat(formattedNumber, " ");
            }
            console.log(base + "           " + base2);
            for (var i = 0; i < _this.size; i++) {
                var vari = _this.letrasHusky[i] + ' ';
                var vari2 = _this.letrasHusky[i] + ' ';
                for (var j = 0; j < _this.size; j++) {
                    vari += '|' + matriz[i][j];
                    vari2 += '|' + matrizMa[i][j];
                }
                console.log(vari + "           " + vari2);
            }
        };
    }
    // mismo metodo pero con ramdoms
    Batleship.prototype.llenarBarcosMaquina = function () {
        var direcciones = ['vertical', 'horizontal'];
        for (var i = 0; i < 1; i++) {
            var validPosition = false;
            while (!validPosition) {
                var direccion = direcciones[Math.floor(Math.random() * direcciones.length)];
                var x = Math.floor(Math.random() * this.size);
                var y = Math.floor(Math.random() * this.size);
                var boat = new boat_1.Boat(i, direccion);
                validPosition = boat.setposition(x, y);
                if (!validPosition)
                    continue;
                var collision = false;
                for (var _i = 0, _a = this.tableroBotesMa; _i < _a.length; _i++) {
                    var existingBoat = _a[_i];
                    for (var _b = 0, _c = existingBoat.getPosition(); _b < _c.length; _b++) {
                        var pos = _c[_b];
                        for (var _d = 0, _e = boat.getPosition(); _d < _e.length; _d++) {
                            var newPos = _e[_d];
                            if (pos.x === newPos.x && pos.y === newPos.y) {
                                collision = true;
                                break;
                            }
                        }
                        if (collision)
                            break;
                    }
                    if (collision)
                        break;
                }
                if (!collision) {
                    this.tableroBotesMa.push(boat);
                }
                else {
                    validPosition = false;
                }
            }
        }
    };
    Batleship.prototype.playBs = function () {
        return __awaiter(this, void 0, void 0, function () {
            var i, direccion, dir, x, y, leter, validPosition, _a, boat, collision, _i, _b, existingBoat, _c, _d, pos, _e, _f, newPos;
            return __generator(this, function (_g) {
                switch (_g.label) {
                    case 0:
                        this.llenarTableroString(this.tableroJuego);
                        this.llenarTableroString(this.tableroMaquina);
                        this.llenarArrayBarcosM();
                        this.imprimir_tablero(this.tableroJuego);
                        console.log('--------------------------------------------------------');
                        console.log('Fill Boats');
                        i = 1;
                        _g.label = 1;
                    case 1:
                        if (!(i <= 2)) return [3 /*break*/, 7];
                        direccion = '';
                        return [4 /*yield*/, prompt("Chose Direction of boat \nHorizontal :  1  \nVertical: 2\nYour choice: ")];
                    case 2:
                        dir = _g.sent();
                        if (Number(dir) === 1) {
                            direccion = 'vertical';
                        }
                        else if (Number(dir) === 2) {
                            direccion = 'horizontal';
                        }
                        x = void 0;
                        y = void 0;
                        leter = void 0;
                        validPosition = false;
                        _g.label = 3;
                    case 3:
                        if (!!validPosition) return [3 /*break*/, 6];
                        return [4 /*yield*/, prompt("barco largo ".concat(i, " \nx:  "))];
                    case 4:
                        leter = (_g.sent());
                        // for (let j = 0; j < this.letrasHusky.length; j++) {
                        //     if (this.letrasHusky[j] === leter) {
                        //         x = j; // Se usa directamente el índice
                        //         break; // Se puede salir del bucle una vez encontrada la letra
                        //     }
                        // }
                        x = this.letrasHusky.indexOf(leter);
                        _a = Number;
                        return [4 /*yield*/, prompt("barco largo ".concat(i, " \ny:  "))];
                    case 5:
                        y = _a.apply(void 0, [_g.sent()]);
                        boat = new boat_1.Boat(i, direccion);
                        validPosition = boat.setposition(x, y);
                        if (!validPosition) {
                            console.log('Posición inválida, inténtalo de nuevo.');
                            return [3 /*break*/, 3];
                        }
                        collision = false;
                        for (_i = 0, _b = this.tableroBotes; _i < _b.length; _i++) {
                            existingBoat = _b[_i];
                            for (_c = 0, _d = existingBoat.getPosition(); _c < _d.length; _c++) {
                                pos = _d[_c];
                                for (_e = 0, _f = boat.getPosition(); _e < _f.length; _e++) {
                                    newPos = _f[_e];
                                    if (pos.x === newPos.x && pos.y === newPos.y) {
                                        collision = true;
                                        break;
                                    }
                                }
                                if (collision)
                                    break;
                            }
                            if (collision)
                                break;
                        }
                        if (collision) {
                            console.log('Colisión de barcos en ' + x + ' ' + y);
                            validPosition = false;
                        }
                        else {
                            this.tableroBotes.push(boat);
                            this.imprimir_tablero(this.tableroJuego);
                            console.log('Barco colocado correctamente.');
                        }
                        return [3 /*break*/, 3];
                    case 6:
                        i++;
                        return [3 /*break*/, 1];
                    case 7:
                        this.hitShip();
                        return [2 /*return*/];
                }
            });
        });
    };
    Batleship.prototype.hitShip = function () {
        return __awaiter(this, void 0, void 0, function () {
            var x, y, leter, _a, _i, _b, existingBoat, sign;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        console.log('Now it’s time to hit boats :) \n');
                        _c.label = 1;
                    case 1:
                        if (!(this.lives > 0 && this.livesMa > 0)) return [3 /*break*/, 5];
                        this.imprimirTablerosJuego(this.tableroJuego, this.tableroMaquina);
                        return [4 /*yield*/, prompt("Insert letter (x): ")];
                    case 2:
                        leter = _c.sent();
                        x = this.letrasHusky.indexOf(leter);
                        _a = Number;
                        return [4 /*yield*/, prompt("Insert number (y): ")];
                    case 3:
                        y = _a.apply(void 0, [_c.sent()]);
                        if (this.tableroMaquina[x][y] !== ' ◎ ' && this.tableroMaquina[x][y] !== ' ⍾ ') {
                            for (_i = 0, _b = this.tableroBotesMa; _i < _b.length; _i++) {
                                existingBoat = _b[_i];
                                sign = existingBoat.getHitsBoats(x, y);
                                if (sign === ' ◎ ') {
                                    this.livesMa--;
                                    this.tableroMaquina[x][y] = sign;
                                    break;
                                }
                            }
                            if (this.tableroMaquina[x][y] !== ' ◎ ') {
                                this.tableroMaquina[x][y] = ' ⍾ ';
                            }
                        }
                        // Turno de la máquina
                        return [4 /*yield*/, this.hitShipMachine()];
                    case 4:
                        // Turno de la máquina
                        _c.sent();
                        return [3 /*break*/, 1];
                    case 5:
                        // Mensaje final
                        if (this.livesMa === 0) {
                            console.log('You are a Shipper, God blessed America');
                        }
                        else if (this.lives === 0) {
                            console.log('Machine won');
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    Batleship.prototype.hitShipMachine = function () {
        return __awaiter(this, void 0, void 0, function () {
            var x, y, _i, _a, existingBoat, sign;
            return __generator(this, function (_b) {
                // Generar posición aleatoria única
                do {
                    x = Math.floor(Math.random() * this.tableroJuego.length);
                    y = Math.floor(Math.random() * this.tableroJuego[0].length);
                } while (this.tableroJuego[x][y] === ' ◎ ' || this.tableroJuego[x][y] === ' ⍾ ');
                for (_i = 0, _a = this.tableroBotes; _i < _a.length; _i++) {
                    existingBoat = _a[_i];
                    sign = existingBoat.getHitsBoats(x, y);
                    if (sign === ' ◎ ') {
                        this.lives--;
                        this.tableroJuego[x][y] = sign;
                        break;
                    }
                }
                // Si no hay impacto
                if (this.tableroJuego[x][y] !== ' ◎ ') {
                    this.tableroJuego[x][y] = ' ⍾ ';
                }
                console.log('Machine hit u');
                return [2 /*return*/];
            });
        });
    };
    return Batleship;
}());
exports.Batleship = Batleship;
