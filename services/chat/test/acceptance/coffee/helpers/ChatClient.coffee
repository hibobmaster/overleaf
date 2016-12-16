request = require("request").defaults({baseUrl: "http://localhost:3010"})

module.exports =
	sendGlobalMessage: (project_id, user_id, content, callback) ->
		request.post {
			url: "/project/#{project_id}/messages"
			json:
				user_id: user_id
				content: content
		}, callback
	
	getGlobalMessages: (project_id, callback) ->
		request.get {
			url: "/project/#{project_id}/messages",
			json: true
		}, callback

	sendMessage: (project_id, thread_id, user_id, content, callback) ->
		request.post {
			url: "/project/#{project_id}/thread/#{thread_id}/messages"
			json:
				user_id: user_id
				content: content
		}, callback
	
	getThreads: (project_id, callback) ->
		request.get {
			url: "/project/#{project_id}/threads",
			json: true
		}, callback