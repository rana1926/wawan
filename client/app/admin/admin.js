angular.module('Wawan.admin', [
    'ngMessages'])
.controller('adminController', function($scope, $routeParams, $window, $location, Country, Player, Competition, Championship, Translate, Imugur, Club, Coach, Referee, $mdDialog) {
	$scope.player = {};
	$scope.clubs = [];
	$scope.coaches = [];
	$scope.types = ["Physic","Bodybuilding","Bodystyle"];
	$scope.typesAr = ["فيزيك","كمال اجسام","بادي ستايل"];

	$scope.sizes = ["Under 170 cm","Under 175 cm", "Under 180 cm","Above 180 cm","Under 75 kg","Under 85 kg","Above 85 kg", "Under 70 kg","Under 80 kg","Above 80 kg"];
	$scope.sizeAr = ["تحت 171 سم","تحت 176 سم","فوق 176 سم","تحت 75 كغ","تحت 85 كغ","فوق 85 كغ","تحت 70 كغ","تحت 80 كغ","فوق 80 كغ"];

	$scope.disableLevel = true;
	$scope.player.pic = "https://amploprod.s3.amazonaws.com/assets/no-user-image-square-9f6a473a32ad639f619216331d10d61ce1b35c9271d5683920960e1a5ee45bb8.jpg"

	$scope.championship = {};
	$scope.flag = false;
	$scope.data = {};
	$scope.data.competitions = [];
	$scope.championship.pic = "http://www.clipartkid.com/images/523/prize-reward-sport-trophy-win-winner-icon-icon-search-engine-mmsWyq-clipart.png"
	$scope.typesChampion = ["Physic","Bodybuilding","Bodystyle"];
	$scope.typesArChampion = ["فيزيك","كمال اجسام","بادي ستايل"];
	$scope.positions = [1,2,3];
	$scope.championshipPositions = [1,2,3,4,5,6,7,8,9,10];
	$scope.championship.competitions = [];
	$scope.championship.positions=[];

	$scope.editChampionship = {};

	$scope.club = {};

	$scope.coach = {};

	$scope.referee = {};
	var editTab=false;

	$scope.initialize = function () {
		if($window.localStorage.loggedIN=='false' || $window.localStorage.loggedIN==null){
			$location.path('/login');
		}
		$scope.club.pic = "https://amploprod.s3.amazonaws.com/assets/no-user-image-square-9f6a473a32ad639f619216331d10d61ce1b35c9271d5683920960e1a5ee45bb8.jpg";
		$scope.coach.pic = "https://amploprod.s3.amazonaws.com/assets/no-user-image-square-9f6a473a32ad639f619216331d10d61ce1b35c9271d5683920960e1a5ee45bb8.jpg";
		$scope.referee.pic = "https://amploprod.s3.amazonaws.com/assets/no-user-image-square-9f6a473a32ad639f619216331d10d61ce1b35c9271d5683920960e1a5ee45bb8.jpg";
		
		Country.getAllCountry()
		.then(function (countryes) {
			$scope.countryes = countryes;
		});
		Club.getAllClub()
		.then(function (clubs) {
			$scope.clubs = clubs;
		})
		Coach.getAllCoachs()
		.then(function (coaches) {
			$scope.coaches = coaches;
		})
		Referee.getAllReferee()
		.then(function (referees) {
			$scope.referees = referees;
		})
		Championship.getAllChampionship()
		.then(function (championships) {
			$scope.data.championships = championships
		})
		Player.getAllPlayer()
		.then(function (players) {
			$scope.players = players;
		})
		.catch(function (err) {
			console.log(err)
		})
	}
	$scope.initialize();

	$scope.logout = function () {
		if(typeof(Storage)!="undefined"){
			$window.localStorage.clear();
		    $window.localStorage.loggedIN=false;
		    $location.path('/login');
		}
	    else{
	    	setCookie('token','', 15);
        	setCookie('userId','', 15);
        	setCookie('loggedIN', false, 15);
        	$location.path('/login');
	    }
	}
	function setCookie(cname, cvalue, exdays) {
      var d = new Date();
      d.setTime(d.getTime() + (exdays*24*60*60*1000));
      var expires = "expires="+ d.toUTCString();
      document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/login";
    }
	$scope.typeSelectChangedPlayer = function(){
		$scope.disableLevel = false;
		var currentType = $scope.player.type;
		if(editTab){
			var currentType = $scope.edit.player.type;
		}
		if(currentType === "Physic"){
			$scope.player.typeAr = "فيزيك";
			$scope.sizes = ["Under 170 cm","Under 175 cm", "Under 180 cm","Above 180 cm"];
			$scope.sizeAr = ["تحت 170 سم","تحت 175 سم", "تحت 180 سم","فوق 180 سم"];
		}
		else if(currentType === "Bodystyle") {
			$scope.player.typeAr = "بادي ستايل";
			$scope.sizes = ["Under 70 kg","Under 80 kg","Above 80 kg"];
			$scope.sizeAr = ["تحت 70 كغ","تحت 80 كغ","فوق 80 كغ"];
		}
		else{
			$scope.player.typeAr = "كمال اجسام";
			$scope.sizes = ["Under 70 kg", "Under 80 kg", "Under 90 kg","Above 90 kg"];
			$scope.sizeAr = ["تحت 70 كغ","تحت 80 كغ", "تحت 90 كغ", "فوق 90 كغ"];
		}
	};

	$scope.typeSelectChangedChampions = function(){
		$scope.disableLevel = false;
		if($scope.competition.type === "Physic"){
			$scope.sizesChampion = ["Under 170 cm","Under 175 cm", "Under 180 cm","Above 180 cm"];
			$scope.sizeArChampion = ["تحت 170 سم","تحت 175 سم", "تحت 180 سم","فوق 180 سم"];
		}
		else if($scope.competition.type === "Bodystyle") {
			$scope.sizesChampion = ["Under 70 kg","Under 80 kg","Above 80 kg"];
			$scope.sizeArChampion = ["تحت 70 كغ","تحت 80 كغ","فوق 80 كغ"];
		}
		else{
			$scope.sizesChampion = ["Under 70 kg", "Under 80 kg", "Under 90 kg","Above 90 kg"];
			$scope.sizeArChampion = ["تحت 70 كغ","تحت 80 كغ", "تحت 90 كغ", "فوق 90 كغ"];
		}
	};

	$scope.sizeSelectChanged = function () {
		console.log($scope.player.size)
		if($scope.player.size === "Under 170 cm")
			$scope.player.sizeAr = "تحت 170 سم";
		else if($scope.player.size === "Under 175 cm")
			$scope.player.sizeAr = "تحت 175 سم";
		else if($scope.player.size === "Under 180 cm")
			$scope.player.sizeAr = "تحت 180 سم";
		else if($scope.player.size === "Above 180 cm")
			$scope.player.sizeAr = "فوق 180 سم";

		else if($scope.player.size === "Under 70 kg")
			$scope.player.sizeAr = "تحت 70 كغ";
		else if($scope.player.size === "Under 80 kg")
			$scope.player.sizeAr = "تحت 80 كغ";
		else if($scope.player.size === "Under 90 kg")
			$scope.player.sizeAr = "تحت 90 كغ";
		else if($scope.player.size === "Above 90 kg")
			$scope.player.sizeAr = "فوق 90 كغ";
		
	}

	$scope.createPlayer = function (ev) {
		console.log($scope.player);
		if($scope.player.name && $scope.player.nameAr && $scope.player.type && $scope.player.size){
			if($scope.player.coach) {
				var coachName = $scope.player.coach;
				for (var i = 0; i < $scope.coaches.length; i++) {
					if($scope.coaches[i].name === coachName){
						console.log($scope.coaches[i]._id);
						$scope.player.coach = $scope.coaches[i]._id
					}
				}
			}
			if($scope.player.club) {
				var clubName = $scope.player.club;
				for (var i = 0; i < $scope.clubs.length; i++) {
					if($scope.clubs[i].name === clubName){
						console.log($scope.clubs[i]._id);
						$scope.player.club = $scope.clubs[i]._id
					}
				}
			}

			Player.createNewPlayer($scope.player)
			.then(function (player) {
				console.log(player);
				$mdDialog.show(
				      $mdDialog.alert()
				        .parent(angular.element(document.querySelector('#popupContainer')))
				        .clickOutsideToClose(true)
				        .title('The Player has been Created')
				        .ariaLabel('Alert Dialog Demo')
				        .ok('Got it!')
				        .targetEvent(ev)
				    ).then(function () {
		  				$window.location.reload();
				    })
			})
			.catch(function (err) {
				alert("ther is same name")
			})
		}
		else
			console.log("fill all fields")
	}

	$scope.changeProfilePic = function(){
		$scope.isLoading = true;
		var IMGUR_CLIENT_ID = window.IMGUR_CLIENT_ID;
		var fileBt = $('<input>').attr('type','file');
		fileBt.on('change', function() {
			var file = fileBt[0].files[0];
			var reader = new FileReader();
			reader.addEventListener('load', function(){
				var imgData = (reader.result.split(','))[1];
				// sending the decoded image to IMGUR to get a link for that image
				Imugur.uploadToIMGUR(IMGUR_CLIENT_ID, imgData, function(result){
					$scope.isLoading = false;
					$scope.player.pic = result.link;
					console.log(result.link);
				});
			})
			// using the reader to decode the image to base64
			reader.readAsDataURL(file);
		})
		fileBt.click();
	}

	$scope.championshipPic = function () {
		$scope.isLoading = true;
			var IMGUR_CLIENT_ID = window.IMGUR_CLIENT_ID;
			var fileBt = $('<input>').attr('type','file');
			fileBt.on('change', function(){
				var file = fileBt[0].files[0];
				var reader = new FileReader();
				reader.addEventListener('load', function(){
					var imgData = (reader.result.split(','))[1];
					// sending the decoded image to IMGUR to get a link for that image
					Imugur.uploadToIMGUR(IMGUR_CLIENT_ID, imgData, function(result){
						$scope.isLoading = false;
						$scope.championship.pic = result.link;
						console.log(result.link);
					});
				})
				// using the reader to decode the image to base64
				reader.readAsDataURL(file);
			})
			fileBt.click();
	}

	$scope.addCompetition = function () {
		if($scope.competition){
			if($scope.competition.size && $scope.competition.type){
				$scope.data.competitions.push({type : $scope.competition.type, size : $scope.competition.size})
				//Competition.createCompetition({})
				$scope.competition.typeArr = Translate.getArr($scope.competition.type);
				$scope.competition.sizeArr = Translate.getArr($scope.competition.size);
				var competitionObj = {
					type : $scope.competition.type,
					typeAr : $scope.competition.typeAr,
					size : $scope.competition.size,
					sizeAr : $scope.competition.sizeAr
				}
				Competition.createCompetition(competitionObj)
				.then(function (competition) {
					console.log(competition);
					$scope.championship.competitions.push(competition._id);
				})
				.catch(function (err) {
					console.log(err);
				})
				$scope.competition.type = "";
				$scope.competition.size = "";
			}
		}
	}

	
	$scope.removeCopmetitiopn = function (OneCompetition) {
		console.log(OneCompetition);
	}


	$scope.createChampion = function (ev) {
		Championship.createChampionship($scope.championship)
		.then(function (championship) {
			console.log(championship);
			$mdDialog.show(
				$mdDialog.alert()
					.parent(angular.element(document.querySelector('#popupContainer')))
					.clickOutsideToClose(true)
					.title('The Championship has been Created')
					.ariaLabel('Alert Dialog Demo')
					.ok('Got it!')
					.targetEvent(ev)
			).then(function () {
				$window.location.reload();
			})
		})
		.catch(function (err) {
			console.log(err);
		})
	}

	$scope.clubPic = function () {
		$scope.isLoading = true;
			var IMGUR_CLIENT_ID = window.IMGUR_CLIENT_ID;
			var fileBt = $('<input>').attr('type','file');
			fileBt.on('change', function() {
				var file = fileBt[0].files[0];
				var reader = new FileReader();
				reader.addEventListener('load', function(){
					var imgData = (reader.result.split(','))[1];
					// sending the decoded image to IMGUR to get a link for that image
					Imugur.uploadToIMGUR(IMGUR_CLIENT_ID, imgData, function(result){
						$scope.isLoading = false;
						$scope.club.pic = result.link;
						console.log(result.link);
					});
				})
				// using the reader to decode the image to base64
				reader.readAsDataURL(file);
			})
			fileBt.click();
	}

	$scope.createClub = function (ev) {
		Club.createNewClub($scope.club)
		.then(function (club) {
			console.log(club);
			$mdDialog.show(
				$mdDialog.alert()
					.parent(angular.element(document.querySelector('#popupContainer')))
					.clickOutsideToClose(true)
					.title('The Club has been Created')
					.ariaLabel('Alert Dialog Demo')
					.ok('Got it!')
					.targetEvent(ev)
			).then(function () {
				$window.location.reload();
			})
			$scope.initialize();
		})
		.catch(function (err) {
			console.log(err);
		})
	}

	$scope.coachPic = function () {
		$scope.isLoading = true;
		var IMGUR_CLIENT_ID = window.IMGUR_CLIENT_ID;
		var fileBt = $('<input>').attr('type','file');
		fileBt.on('change', function() {
			var file = fileBt[0].files[0];
			var reader = new FileReader();
			reader.addEventListener('load', function(){
				var imgData = (reader.result.split(','))[1];
				// sending the decoded image to IMGUR to get a link for that image
				Imugur.uploadToIMGUR(IMGUR_CLIENT_ID, imgData, function(result){
					$scope.coach.pic = result.link;
					console.log(result.link);
					$scope.isLoading = false;
				});
			})
			// using the reader to decode the image to base64
			reader.readAsDataURL(file);
		})
		fileBt.click();
	}

	$scope.createCoach = function (ev) {
		var clubName = $scope.coach.club;
		for (var i = 0; i < $scope.clubs.length; i++) {
			if($scope.clubs[i].name === clubName){
				console.log($scope.clubs[i]._id);
				$scope.coach.club = $scope.clubs[i]._id
			}
		}
		Coach.createNewCoach($scope.coach)
		.then(function (coach) {
			console.log(coach);
			$mdDialog.show(
				$mdDialog.alert()
					.parent(angular.element(document.querySelector('#popupContainer')))
					.clickOutsideToClose(true)
					.title('The Coach has been Created')
					.ariaLabel('Alert Dialog Demo')
					.ok('Got it!')
					.targetEvent(ev)
			).then(function () {
				$window.location.reload();
			})
			$scope.initialize();
		})
		.catch(function (err) {
			console.log(err);
		})
	}

	$scope.refereePic = function () {
		$scope.isLoading = true;
		var IMGUR_CLIENT_ID = window.IMGUR_CLIENT_ID;
		var fileBt = $('<input>').attr('type','file');
		fileBt.on('change', function() {
			var file = fileBt[0].files[0];
			var reader = new FileReader();
			reader.addEventListener('load', function(){
				var imgData = (reader.result.split(','))[1];
				// sending the decoded image to IMGUR to get a link for that image
				Imugur.uploadToIMGUR(IMGUR_CLIENT_ID, imgData, function(result){
					$scope.referee.pic = result.link;
					console.log(result.link);
					$scope.isLoading = false;
				});
			})
			// using the reader to decode the image to base64
			reader.readAsDataURL(file);
		})
		fileBt.click();
	}

	$scope.createReferee = function (ev) {
		Referee.createNewReferee($scope.referee)
		.then(function (referee) {
			console.log(referee);
			$mdDialog.show(
				$mdDialog.alert()
					.parent(angular.element(document.querySelector('#popupContainer')))
					.clickOutsideToClose(true)
					.title('The Referee has been Created')
					.ariaLabel('Alert Dialog Demo')
					.ok('Got it!')
					.targetEvent(ev)
			).then(function () {
				$window.location.reload();
			})
			$scope.initialize();
		})
		.catch(function (err) {
			console.log(err)
		})
	}

	$scope.editTab = function () {
		editTab = true;
		$scope.edit = {};
		Player.getAllPlayer()
		.then(function (players) {
			$scope.edit.players = players;
		})
		.catch(function (err) {
			console.log(err)
		})

		Championship.getAllChampionship()
		.then(function (championships) {
			$scope.edit.championships = championships;
		})
		.catch(function (err) {
			console.log(err)
		})

		Club.getAllClub()
		.then(function (clubs) {
			$scope.edit.clubs = clubs;
		})
		.catch(function (err) {
			console.log(err)
		})

		Coach.getAllCoachs()
		.then(function (coaches) {
			$scope.edit.coaches = coaches;
		})
		.catch(function (err) {
			console.log(err)
		})

		Referee.getAllReferee()
		.then(function (referees) {
			$scope.edit.referees = referees;
		})
		.catch(function (err) {
			console.log(err)
		})
	}



	$scope.selectPlayer = function () {
		//console.log($scope.edit.player.name);
		var playerName = $scope.edit.player.name;
		for (var i = 0; i < $scope.edit.players.length; i++) {
			if($scope.edit.players[i].name === playerName){
				$scope.edit.player = $scope.edit.players[i];
				$scope.edit.player.coach = $scope.getCoachId($scope.edit.player.coach);
				$scope.edit.player.club = $scope.getClubId($scope.edit.player.club);
				$scope.edit.player.type = $scope.edit.player.type;
				$scope.edit.player.size = $scope.edit.player.size;
				$scope.edit.player.dateOB = new Date($scope.edit.players[i].dateOB);
				$scope.player = $scope.edit.player;
			}
		}
		$scope.typeSelectChangedPlayer();

	}

	$scope.selectChampion = function () {
		var championshipName = $scope.edit.championship.name;
		for (var i = 0; i < $scope.data.championships.length; i++) {
			if($scope.data.championships[i].name === championshipName){
				$scope.edit.championship = $scope.edit.championships[i];
				console.log($scope.data.championships[i].date);
				$scope.edit.championship.date = new Date($scope.data.championships[i].date);
				// $scope.getCoachId($scope.edit.player.coach);
				// $scope.edit.player.club = $scope.getClubId($scope.edit.player.club);
				// $scope.edit.player.type = $scope.edit.player.type;
				// $scope.edit.player.size = $scope.edit.player.size;
			}
		}
	}

	$scope.selectClub = function () {
		var clubName = $scope.edit.club.name;
		for (var i = 0; i < $scope.edit.clubs.length; i++) {
			if($scope.edit.clubs[i].name === clubName){
				$scope.edit.club = $scope.edit.clubs[i];
			}
		}
	}

	$scope.selectCoach = function () {
		var coachName = $scope.edit.coach.name;
		for (var i = 0; i < $scope.edit.coaches.length; i++) {
			if($scope.edit.coaches[i].name === coachName){
				$scope.edit.coach = $scope.edit.coaches[i];
				$scope.edit.coach.club = $scope.getClubId($scope.edit.coach.club);
			}
		}
	}

	$scope.selectReferee = function () {
		var refereeName = $scope.edit.referee.name;
		for (var i = 0; i < $scope.edit.referees.length; i++) {
			if($scope.edit.referees[i].name === refereeName){
				$scope.edit.referee = $scope.edit.referees[i];
			}
		}
	}

	$scope.editClub = function (ev) {
		Club.editClub($scope.edit.club._id, $scope.edit.club)
		.then(function (club) {
			console.log(club);
			$mdDialog.show(
				$mdDialog.alert()
				.parent(angular.element(document.querySelector('#popupContainer')))
				.clickOutsideToClose(true)
				.title('The Club has been Edit')
				.ariaLabel('Alert Dialog Demo')
				.ok('Got it!')
				.targetEvent(ev)
			).then(function () {
				$window.location.reload();
			})
		})
		.catch(function (err) {
			console.log(err);
		})
	}

	$scope.editCoach = function (ev) {
		Coach.editCoach($scope.edit.coach._id, $scope.edit.coach)
		.then(function (coach) {
			console.log(coach);
			$mdDialog.show(
			$mdDialog.alert()
				.parent(angular.element(document.querySelector('#popupContainer')))
				.clickOutsideToClose(true)
				.title('The Coach has been Edit')
				.ariaLabel('Alert Dialog Demo')
				.ok('Got it!')
				.targetEvent(ev)
			).then(function () {
				$window.location.reload();
			})
		})
		.catch(function (err) {
			console.log(err);
		})
	}

	$scope.editReferee = function (ev) {
		Referee.editReferee($scope.edit.referee._id, $scope.edit.referee)
		.then(function (referee) {
			console.log(referee);
			$scope.edit.referee = {};
			$mdDialog.show(
				$mdDialog.alert()
				.parent(angular.element(document.querySelector('#popupContainer')))
				.clickOutsideToClose(true)
				.title('The Referee has been Edit')
				.ariaLabel('Alert Dialog Demo')
				.ok('Got it!')
				.targetEvent(ev)
			).then(function () {
				$window.location.reload();
			})
		})
		.catch(function (err) {
			console.log(err);
		})
	}

	$scope.editPlayer = function (ev) {
		/*var coachName = $scope.edit.player.coach;
		for (var i = 0; i < $scope.coaches.length; i++) {
			if($scope.coaches[i].name === coachName){
				console.log($scope.coaches[i]._id);
				$scope.edit.player.coach = $scope.coaches[i]._id
			}
		}*/
		Player.editePlayer($scope.edit.player._id, $scope.edit.player, $scope.player)
		.then(function (player) {
			console.log(player);
			$mdDialog.show(
			$mdDialog.alert()
				.parent(angular.element(document.querySelector('#popupContainer')))
				.clickOutsideToClose(true)
				.title('The Player has been Edit')
				.ariaLabel('Alert Dialog Demo')
				.ok('Got it!')
				.targetEvent(ev)
			).then(function () {
				$window.location.reload();
			})
			
		})
		.catch(function (err) {
			alert("ther is same name")
		})
	}

	$scope.editChampion = function () {
		Championship.editChampionship($scope.edit.championship)
		.then(function (championship) {
			console.log(championship);
			$mdDialog.show(
			$mdDialog.alert()
				.parent(angular.element(document.querySelector('#popupContainer')))
				.clickOutsideToClose(true)
				.title('The Championship has been Edit')
				.ariaLabel('Alert Dialog Demo')
				.ok('Got it!')
				.targetEvent(ev)
			).then(function () {
				$window.location.reload();
			})
		})
		.catch(function (err) {
			console.log(err);
		})
	}




	$scope.addRefereeToChampion = function () {
		var refereeId ;
		var refereeName = $scope.data.championship.referee;
		$scope.data.championship.referee = "";
		for (var i = 0; i < $scope.referees.length; i++) {
			if($scope.referees[i].name === refereeName){
				refereeId = $scope.referees[i]._id;
				for (var j = 0; j < $scope.data.championship.referees.length; j++) {
					if($scope.data.championship.referees[j].name === refereeName){
						console.log("the referee alrady exist");
						return null;
					}
				}
				$scope.data.championship.referees.push($scope.referees[i]);
				Championship.addNewRefereeToChampionship($scope.data.championship._id,$scope.data.championship.referees[i]._id)
				.then(function (championship) {
					console.log(championship);
				})
				break;
			}
		}

	}
	$scope.championshipSelected = function () {
		$scope.flag = true;
		$scope.data.championship.Physique = '';
		$scope.data.championship.Bodybuilding = '';
		$scope.data.championship.Bodystyle = '';
		$scope.data.championship.refereesID = [];
		$scope.data.championship.referees = [];
		$scope.data.championship.competitions = [];

		var championshipName = $scope.data.championship.name.replace(" ",".");

		Championship.getAllAboutChampionshipByName(championshipName)
		.then(function (data) {
			console.log(data)
			$scope.data.championship._id = data.championship._id;
			$scope.data.championship.Physique = $scope.getPlayerName(data.championship.Physique);
			$scope.data.championship.Bodybuilding = $scope.getPlayerName(data.championship.Bodybuilding);
			$scope.data.championship.Bodystyle = $scope.getPlayerName(data.championship.Bodystyle);
			$scope.data.championship.refereesEnterPoint = data.championship.refereesEnterPoint;
			$scope.data.championship.referees = data.referees;
			for (var i = 0; i < data.competitions.length; i++) {
				Competition.getAllPlayerOfCopmetition(data.competitions[i]._id)
				.then(function (resData) {
					console.log(resData);
					$scope.data.championship.competitions.push(resData);
				})
			}
		})
		.catch(function (err) {
			console.log(err);
		})
	}

	$scope.refereeSwitchChanged = function (championship,refereeId,flag) {
		console.log(championship)
		Championship.refereeJoinChampionship(championship._id, refereeId, flag, championship.refereesEnterPoint)
		.then(function (championship) {
			console.log(championship);
		})
	}

	$scope.addPlayerToChampion = function (competition,playerName,index) {
		console.log(index);
		var competitionId = competition._id;
		var playerId ;
		$scope.data.championship.player = "";
		for (var i = 0; i < $scope.players.length; i++) {
			if($scope.players[i].name === playerName){
				playerId = $scope.players[i]._id;
				for (var j = 0; j < $scope.data.championship.competitions[index].players.length; j++) {
					if($scope.data.championship.competitions[index].players[j]._id === playerId){
						console.log("the player alrady exist");
						return null;
					}
				}
				$scope.data.championship.competitions[index].players.push($scope.players[i]);
				Competition.addPlayerToCometition(competitionId, playerId, $scope.data.championship._id)
				.then(function (competitionObj) {
					console.log(competitionObj);
				})
			}
		}
	}
	$scope.playerSwitchChanged = function (competitionId, playerId, flag) {
		console.log(playerId,flag);
		Competition.playerJoinCompetition(competitionId, playerId, flag,5)
		.then(function (competition) {
			console.log(competition);
		})
	}

	$scope.getNumber = function(num) {
		console.log(num);
		return new Array(num);   
	}

	$scope.doNoThing = function () {
	}

	$scope.setPlayerPostion = function(competitionId,playerId,position) {
		
		console.log(competitionId,playerId,position,$scope.data.championship._id);
		position = parseInt(position);


		Competition.addNewWiner(competitionId, playerId, position, $scope.data.championship._id)
		.then(function (competition) {
			console.log(competition);
		})
		.catch(function (err) {
			console.log(err);
		})
		
	}

	$scope.showConfirm = function(ev) {
    // Appending dialog to document.body to cover sidenav in docs app
    var confirm = $mdDialog.confirm()
          .title('Would you like to delete your debt?')
          .textContent('All of the banks have agreed to forgive you your debts.')
          .ariaLabel('Lucky day')
          .targetEvent(ev)
          .ok('Please do it!')
          .cancel('Sounds like a scam');

    $mdDialog.show(confirm).then(function() {
      $scope.status = 'You decided to get rid of your debt.';
    }, function() {
      $scope.status = 'You decided to keep your debt.';
    });
  }

  $scope.addOverAllWiner = function (championshipId, player, type) {
  	console.log(championshipId._id, $scope.getPlayerId(player), type);
  	Championship.addOverAllWiner(championshipId._id, $scope.getPlayerId(player), type)
  	.then(function (championship) {
		console.log(championship);
	})
	.catch(function (err) {
		console.log(err);
	})
  }

  $scope.getPlayerId = function (name) {
  	for (var i = 0; i < $scope.players.length; i++) {
  		if($scope.players[i].name === name)
  			return $scope.players[i]._id;
  	}
  	return null;
  }

  $scope.getPlayerName = function (id) {
  	console.log("AsdasD", id)
  	for (var i = 0; i < $scope.players.length; i++) {
  		if($scope.players[i]._id === id)
  			return $scope.players[i].name;
  	}
  	return null;
  }

  $scope.getCoachId = function (id) {
  	for (var i = 0; i < $scope.coaches.length; i++) {
  		if($scope.coaches[i]._id === id)
  			return $scope.coaches[i]._id;
  	}
  	return null;
  }

  $scope.getClubId = function (id) {
  	for (var i = 0; i < $scope.clubs.length; i++) {
  		if($scope.clubs[i]._id === id)
  			return $scope.clubs[i]._id;
  	}
  	return null;
  }

  $scope.typeEditSelected = function () {
  	$scope.typeSelectChangedPlayer();
	$scope.edit.player.typeAr = Translate.getArr($scope.edit.player.type);
  }

  $scope.sizeEditSelected = function () {
  	$scope.typeSelectChangedPlayer();
  	$scope.edit.player.sizeAr = Translate.getArr($scope.edit.player.size);
  }

  $scope.deletePlayer = function (ev) {
  	if($scope.edit.player){
  		var confirm = $mdDialog.confirm()
          .title('Would you like to delete the Player?')
          .ariaLabel('Lucky day')
          .targetEvent(ev)
          .ok('Yes')
          .cancel('Cancel');

	    $mdDialog.show(confirm).then(function() {
	    	console.log('yes')
	    	Player.removePlayer($scope.edit.player._id)
		  		.then(function (data) {
		  			console.log(data);
		  			$mdDialog.show(
				      $mdDialog.alert()
				        .parent(angular.element(document.querySelector('#popupContainer')))
				        .clickOutsideToClose(true)
				        .title('The Player has been deleted')
				        .ariaLabel('Alert Dialog Demo')
				        .ok('Got it!')
				        .targetEvent(ev)
				    ).then(function () {
		  				$window.location.reload();
				    })
		  		})
		  		.catch(function (err) {
		  			console.log(err)
		  		})
	    }, function() {
	    	console.log('cancel')
	      $scope.status = 'You decided to keep your debt.';
	    });
  	}
  }

  $scope.deleteClub = function (ev) {
  	if($scope.edit.club){
  		var confirm = $mdDialog.confirm()
          .title('Would you like to delete the Club?')
          .ariaLabel('Lucky day')
          .targetEvent(ev)
          .ok('Yes')
          .cancel('Cancel');

	    $mdDialog.show(confirm).then(function() {
	    	console.log('yes')
	    	Club.removeClub($scope.edit.club._id)
		  		.then(function (data) {
		  			console.log(data);
		  			$mdDialog.show(
				      $mdDialog.alert()
				        .parent(angular.element(document.querySelector('#popupContainer')))
				        .clickOutsideToClose(true)
				        .title('The Club has been deleted')
				        .ariaLabel('Alert Dialog Demo')
				        .ok('Got it!')
				        .targetEvent(ev)
				    ).then(function () {
		  				$window.location.reload();
				    })
		  		})
		  		.catch(function (err) {
		  			console.log(err)
		  		})
	    }, function() {
	    	console.log('cancel')
	      $scope.status = 'You decided to keep your debt.';
	    });
  	}
  }

  $scope.deleteCoach = function (ev) {
  	if($scope.edit.coach){
  		var confirm = $mdDialog.confirm()
          .title('Would you like to delete the Coach?')
          .ariaLabel('Lucky day')
          .targetEvent(ev)
          .ok('Yes')
          .cancel('Cancel');

	    $mdDialog.show(confirm).then(function() {
	    	Coach.removeCoach($scope.edit.coach._id)
		  		.then(function (data) {
		  			console.log(data);
		  			$mdDialog.show(
				      $mdDialog.alert()
				        .parent(angular.element(document.querySelector('#popupContainer')))
				        .clickOutsideToClose(true)
				        .title('The Coach has been deleted')
				        .ariaLabel('Alert Dialog Demo')
				        .ok('Got it!')
				        .targetEvent(ev)
				    ).then(function () {
		  				$window.location.reload();
				    })
		  		})
		  		.catch(function (err) {
		  			console.log(err)
		  		})
	    }, function() {
	    	console.log('cancel')
	      $scope.status = 'You decided to keep your debt.';
	    });
  	}
  }

  $scope.deleteReferee = function (ev) {
  	if($scope.edit.referee){
  		var confirm = $mdDialog.confirm()
          .title('Would you like to delete the Referee?')
          .ariaLabel('Lucky day')
          .targetEvent(ev)
          .ok('Yes')
          .cancel('Cancel');

	    $mdDialog.show(confirm).then(function() {
	    	Referee.removeReferee($scope.edit.referee._id)
		  		.then(function (data) {
		  			console.log(data);
		  			$mdDialog.show(
				      $mdDialog.alert()
				        .parent(angular.element(document.querySelector('#popupContainer')))
				        .clickOutsideToClose(true)
				        .title('The Referee has been deleted')
				        .ariaLabel('Alert Dialog Demo')
				        .ok('Got it!')
				        .targetEvent(ev)
				    ).then(function () {
		  				$window.location.reload();
				    })
		  		})
		  		.catch(function (err) {
		  			console.log(err)
		  		})
	    }, function() {
	    	console.log('cancel')
	      $scope.status = 'You decided to keep your debt.';
	    });
  	}
  }
 //  $scope.disableLevel = false;
	// 	if($scope.competition.type === "Physic"){
	// 		$scope.sizesChampion = ["Under 171 CM","Under 176 CM","Above 176 CM"];
	// 		$scope.sizeArChampion = ["تحت 171 سم","تحت 176 سم","فوق 176 سم"];
	// 	}
	// 	else if($scope.competition.type === "Bodystyle") {
	// 		$scope.sizesChampion = ["Under 171 CM","Under 176 CM","Above 176 CM"];
	// 		$scope.sizeArChampion = ["تحت 171 سم","تحت 176 سم","فوق 176 سم"];
	// 	}
	// 	else{
	// 		$scope.sizesChampion = ["Under 75 KG","Under 85 KG","Above 85 KG"];
	// 		$scope.sizeArChampion = ["تحت 75 كغ","تحت 85 كغ","فوق 85 كغ"];
	// 	}
	// };

	// $scope.sizeSelectChanged = function () {
	// 	console.log($scope.player.size)
	// 	if($scope.player.size === "Under 171 CM")
	// 		$scope.player.sizeAr = "تحت 171 سم";
	// 	else if($scope.player.size === "Under 176 CM")
	// 		$scope.player.sizeAr = "تحت 176 سم";
	// 	else if($scope.player.size === "Above 176 CM")
	// 		$scope.player.sizeAr = "فوق 176 سم";
	// 	else if($scope.player.size === "Under 75 KG")
	// 		$scope.player.sizeAr = "تحت 75 كغ";
	// 	else if($scope.player.size === "Under 85 KG")
	// 		$scope.player.sizeAr = "تحت 85 كغ";
	// 	else
	// 		$scope.player.sizeAr = "فوق 85 كغ";
});