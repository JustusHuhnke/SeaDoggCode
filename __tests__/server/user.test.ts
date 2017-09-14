import {exec} from "child_process";
import {resolve} from "path";
const temp_dir = resolve(".gulp/temp");

test("Compile file", (done) => {
    const load = "TEMP_NAME=" + resolve("server/db/models/index") + " " + "TEMP_DIR=" + temp_dir + " " + resolve("node_modules/.bin/webpack") + " --config " + resolve("webpack/webpack.config.backend.dev.js");
    exec(load, done);
}, 10000);

let user_id;

test("Create user", async (done) => {
    const {User} = require(temp_dir + "/bundle.js");
    try {
        const newUser = new User({
            email: "email",
            firstName: "firstName",
            lastName: "lastName",
        });
        await newUser.save();
        user_id = newUser._id;
        expect(user_id).not.toBe(null);
        done();
    } catch (err) {
        expect(err).toBe(null);
        done(err);
    }
}, 5000);

test("Create user with exist email", async (done) => {
    const {User} = require(temp_dir + "/bundle.js");
    try {
        const newUser = new User({
            email: "email",
            firstName: "firstName",
            lastName: "lastName",
        });
        await newUser.save();
        user_id = newUser._id;
        expect(user_id).toBe(null);
        expect("User must be already exist.").toBeTruthy();
        done("User must be already exist.");
    } catch (err) {
        expect(err).not.toBe(null);
        done();
    }
}, 5000);

test("Create user", async (done) => {
    const {User} = require(temp_dir + "/bundle.js");
    try {
        const newUser = new User({
            // email: "email",
            firstName: "firstName",
            lastName: "lastName",
        });
        await newUser.save();
        user_id = newUser._id;
        expect(user_id).not.toBe(null);
        done("Email must be required.");
    } catch (err) {
        expect(err).not.toBe(null);
        done();
    }
}, 5000);

test("Delete user", async (done) => {
    const {User} = require(temp_dir + "/bundle.js");
    try {
        await User.remove({_id: user_id});
        done();
    } catch (err) {
        expect(err).toBeTruthy();
        expect(err).toBe(null);
        done(err);
    }
}, 5000);
