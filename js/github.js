/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/*
 * INFO
 * https://stackoverflow.com/questions/11850527/use-javascript-to-get-the-list-of-a-users-github-repositories
 * https://api.github.com/search/repositories?q=user:knightdanila
 * https://api.github.com/users/knightdanila/repos?
 * https://developer.github.com/v3/search/#search-users
 */


jQuery.githubUser = function (username, callback) {
    jQuery.getJSON("https://api.github.com/search/repositories?q=user:" + username, callback);
};

jQuery.fn.loadRepositories = function (username) {
    this.html("<span>Querying GitHub for repositories...</span>");

    var target = this;
    $.githubUser(username, function (data) {
        var repos = Array();
        $(data.items).each(function () {
            repos.push(this);
        });
        
        var list = $('<dl/>');
        target.empty().append(list);
        $(repos).each(function () {
            list.append('<dt><a href="' + this.homepage + '">' + this.name + '</a></dt>');
            list.append('<dd>' + this.description + '</dd>');
        });
    });

};