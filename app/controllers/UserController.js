module.exports = {
    get: (req, res) => {
        res.send(`

            <div style="display: flex; justify-content: center; align-items: center; height: 50vh;">
                <form action="/User" method="post" style="text-align: center;">
                    <h1 style="text-align: center;">Login</h1>
                    <label for="username">Username:</label>
                    <input type="text" id="username" name="username"><br><br>
                    <label for="password">Password:</label>
                    <input type="password" id="password" name="password"><br><br>
                    <button type="connect">Connect</button>
                </form>
            </div>
        `);
    }
};