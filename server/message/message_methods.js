Meteor.methods({
	addTopic: function(formObj){
		var user = Meteor.user();
		if(!user){
			throw new Meteor.Error(401, "You need to login to send messages");
		}
		//查找原帖主人
		switch(formObj.referType){
			case 'Property':
				var property = Properties.findOne({_id:formObj.referId});
				var author = property.author;
				//添加主人
				formObj.chatWith = author;
				break;
			case 'System':
				//find admin and add admin into chatwith
				var chatWith = Meteor.users.findOne({isAdmin:true});
				formObj.chatWith = chatWith._id;
				break;
		}
		var topicId = Topics.insert(formObj, function(err, res) {
			if(err){
				console.log(err);
				return false;
			}
		});
		return topicId;
	},
	addConversation: function(topicId, content) {
		var topic = Topics.findOne({_id:topicId});
		var author = topic.chatWith;
		
		if(topic.creator == Meteor.userId()) {
			var sender = Meteor.userId();
			var receiver = author;
		} 
		else if(author == Meteor.userId()) {
			var sender = author;
			var receiver = topic.creator;
		} 
		else {
			throw new Meteor.Error(401, "Forbidden");
		}

		//make two copies
		Messages.insert({
			topicId: topic._id,
			owner: sender,
			sender: sender,
			receiver: receiver,
			content: content
		}, function(err, res){
			if(err) {
				console.log(err);
				return false;
			}
			else {
				Messages.insert({
					topicId: topic._id,
					owner: receiver,
					sender: sender,
					receiver: receiver,
					content: content
				}, function(err, res) {
					Topics.update({
						_id: topic._id 
					},
					{
						$set: { updatedAt: new Date() }
					});
					if(err) {
						console.log(err);
						return false;
					}
				})
			}
		});
		return true;
	},
	readConversation: function(topicId){
		var user = Meteor.user();
		if(!user){
			throw new Meteor.Error(401, "You need to login to send messages");
		}
		Messages.update({ 
			topicId: topicId, owner:Meteor.userId() 
		},
		{
			$set: {
				isRead: true
			}
		},
		{
			multi:true
		})
	}
});