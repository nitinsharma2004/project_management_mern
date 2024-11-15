
export function localVariables(req, res, next) {
    console.log("enter localVariables");
    res.app.locals = {
        OTP: null,
        resetSession: false,
        CODE: null
    };
    next();
}