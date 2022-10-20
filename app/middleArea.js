"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("./config/config");
const jwt = require("jsonwebtoken");
function middle(app) {
    // app.use可以看做一个路由守卫，请求会先进入use方法，如果use方法返回false，则不会进入下一个方法。如果执行next()可以进入下一个方法，一般在这里可以做一些请求拦截，比如token校验。
    // 设置不需要校验token的url路径(白名单)
    let whiteUrl = /(\/api\/login)|(^\/\??[\w=]*$)|(\/list\.html\??[\w=]*)|(\/detail\.html\??[\w=]*)/;
    app.use(function (req, res, next) {
        // 如果符号白名单路由，则直接进入下一个方法
        if (whiteUrl.test(req.url)) {
            next();
            return;
        }
        // 获取token
        const { authorization } = req.headers;
        if (!authorization) {
            // 如果没有token，则返回403的状态码和错误信息
            res.status(403).send({ success: false, message: "没有token!" });
            return;
        }
        jwt.verify(authorization, config_1.tokenKey, function (err, result) {
            if (err) {
                // token解析有错误，返回错误到前端
                res.status(403).send({ success: false, message: "token无效!" });
                return;
            }
            // id是token加密的用户id，iat是当前的时间戳，exp token设置的过期时间
            const { id, iat, exp } = result;
            if (exp < iat) {
                // 如果token的过期时间小于当前时间，说明token已经过期了。
                res.status(403).send({ success: false, message: "token过期!" });
                return;
            }
            // 给req对象添加一个uid属性存储用户id，后面的路由如果要用当前登录用户的id值直接从req的uid属性取。
            req.uid = id;
            next();
        });
    });
}
exports.default = middle;
