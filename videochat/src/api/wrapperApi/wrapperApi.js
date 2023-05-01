module.exports.wrapperApi = (handler) => {
    return async (req, res) => {
        try {
            await handler(req, res);
        } catch (err) {
            console.error('[wrapperApi]:', err.toString(), err);
            return res
                .status(500)
                .send({ message: `Internal server error:${err.toString()}` });
        }
    };
};