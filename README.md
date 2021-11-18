# inventory
Desktop and mobile inventory management software

You will have to install node and should install electron globally (npm install -g electron), then after you clone, I think “npm init” will have you set up.

From the right folder "npm start" should start the app.

Using sqllite3 with electron trying:
https://stackoverflow.com/questions/32504307/how-to-use-sqlite3-module-with-electron

"scripts": {
   "postinstall": "install-app-deps"
   ...
}

in package.json

npm install --save-dev electron-builder # I already installed, trying without this liine
npm install --save sqlite3
(did npm audit fix and npm audit fix --force)
npm run postinstall (took this out)
got error (sh: install-app-deps: command not found)
see if it worked anyway
npm install --save knex (people seem to like this - makes it so you don't have to change code if you change db)
npm install --save-dev electron-rebuild (this helps with problems because of different versions on node)
(look at package.json) - people who clone probably just have to npm install
npm run rebuild

needs database, create the database for sqlite
create table entity(entity_id integer primary key autoincrement, first_name text not null, last_name text not null);

looking at this https://www.youtube.com/watch?v=c76FTxLRwAw
going to look at this for packaging https://www.youtube.com/watch?v=aNJDdCjdDpU

npm install electron-packager -g
electron-packager . inventory --all -asar

at the moment packaging only part working - doesn't work with db
going to demo write, update, and delete to db in unpackaged version before
packaging