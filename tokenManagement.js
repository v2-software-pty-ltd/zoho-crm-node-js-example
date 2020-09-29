const fs = require('fs');
var path = require('path');
var file_persistence = {};
file_persistence.updateOAuthTokens = function (tokenobject) {
  return new Promise(function (resolve, reject) {
    var tokens = {}
    if (fs.existsSync(path.dirname(require.main.filename) + '/zcrm_oauthtokens.txt')) {
      var token_as_string = fs.readFileSync(path.dirname(require.main.filename) + '/zcrm_oauthtokens.txt', 'utf8');
      tokens = JSON.parse(token_as_string);

      for (token in tokens.tokens) {
        if (tokens.tokens[token].user_identifier == tokenobject.user_identifier) {
          tokens.tokens.splice(token)
        }
      }
      tokens.tokens.push(tokenobject);
    }
    else {
      tokens.tokens = [tokenobject]
    }
    token_as_string = JSON.stringify(tokens);

    fs.writeFile(path.dirname(require.main.filename) + '/zcrm_oauthtokens.txt', token_as_string, function (err) {
      if (err) throw err;
      resolve();
    });
  })
}

file_persistence.getOAuthTokens = function (user_identifier) {
  return new Promise(function (resolve, reject) {
    var found = 0;

    if (fs.existsSync(path.dirname(require.main.filename) + '/zcrm_oauthtokens.txt')) {
      var token_as_string = fs.readFileSync(path.dirname(require.main.filename) + '/zcrm_oauthtokens.txt', 'utf8');
      tokens = JSON.parse(token_as_string);

      for (token in tokens.tokens) {
        if (tokens.tokens[token].user_identifier == user_identifier) {
          found = 1;
          resolve(tokens.tokens[token]);
        }
      }

      if (found == 0) {
        resolve();
      }
    }
  })
}


file_persistence.saveOAuthTokens = function (tokenobject) {
  return new Promise(function (resolve, reject) {
    file_persistence.updateOAuthTokens(tokenobject).then(function () {
      resolve();
    })
  })
}

module.exports = file_persistence;

