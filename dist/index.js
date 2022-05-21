"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var path_1 = __importDefault(require("path"));
var index_1 = __importDefault(require("./routes/index"));
var fs_1 = __importDefault(require("fs"));
var PORT = 3000;
// create an instance server
var app = (0, express_1.default)();
app.use(index_1.default);
app.get('/', function (_, res) {
    res.status(200).send('Image resize make sure url like /api_resize/image?imagename=fjord&w=500&h=500');
});
app.listen(PORT, function () {
    var ResizedFPath = path_1.default.resolve(__dirname, '../assets/ResizedF');
    if (!fs_1.default.existsSync(ResizedFPath)) {
        fs_1.default.mkdirSync(ResizedFPath);
    }
});
exports.default = app;
