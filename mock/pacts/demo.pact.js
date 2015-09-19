var path = require('path');

function guid() {
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
		var r = Math.random() * 16 | 0,
			v = c == 'x' ? r : (r & 0x3 | 0x8);
		return v.toString(16);
	});
}

function uid() {
	// Math.random should be unique because of its seeding algorithm.
	// Convert it to base 36 (numbers + letters), and grab the first 9 characters
	// after the decimal.
	return Math.random().toString(36).substr(2, 9);
}

// Create mock with beta.json-generator.com and this template:
//
//[
//	{
//		'repeat:10': {
//			id: '{{objectId()}}',
//			img: 'http://api.randomuser.me/portraits/{{random("men", "women")}}/{{integer(0, 96)}}.jpg',
//			age: '{{integer(20, 40)}}',
//			name: '{{firstName()}} {{surname()}}',
//			company: '{{company()}}',
//			role: '{{lorem(2, "words")}}',
//			email: function (tags) {
//				return (this.name.split(' ').join('.') + '@' + this.company + tags.domainZone()).toLowerCase();
//			},
//			phone: '+61{{phone("xxxxxxxxx")}}',
//			location: {
//				address: '{{integer(100, 999)}} {{street()}}',
//				city: '{{city()}}',
//				state: '{{state()}}',
//				postalcode: '{{integer(100, 10000)}}',
//				country: '{{country()}}',
//				latitude: '{{floating(-90.000001, 90)}}',
//				longitude: '{{floating(-180.000001, 180)}}'
//			},
//			tags: [
//				{
//					'repeat:7': '{{lorem(1, "words")}}'
//				}
//			],
//			resume: 'http://placehold.it/1240x1754?text=Resume',
//			notes: [
//				{
//					'repeat:3': {
//						by: '{{firstName()}} {{surname()}}',
//						date: '{{date().getTime()}}',
//						message:'{{lorem(2, "sentences")}}'
//					}
//				}
//			]
//		}
//	}
//]

var mockWithoutResults = {
	suggestions: [

	]
};


var mockWithResults = {
	suggestions: [],
	candidates: [
		{
			"id": "55c16bdcfc08f1ac35265e14",
			"img": "http://api.randomuser.me/portraits/women/88.jpg",
			"age": 21,
			"name": "Holcomb Chambers",
			"company": "Octocore",
			"role": "sit commodo",
			"email": "holcomb.chambers@octocore.ca",
			"phone": "+61832427245",
			"location": {
				"address": "398 Tabor Court",
				"city": "Neibert",
				"state": "Virgin Islands",
				"postalcode": 7255,
				"country": "Fiji",
				"latitude": "4.802438",
				"longitude": "14.405329"
			},
			"tags": [
				"consectetur",
				"nulla",
				"sit",
				"id",
				"officia",
				"pariatur",
				"elit"
			],
			"resume": "http://placehold.it/1240x1754?text=Resume",
			"notes": [
				{
					"by": "Aguirre Mckenzie",
					"date": 1034068736930,
					"message": "Fugiat ut nostrud ullamco est aliqua eiusmod do consequat. Qui velit qui nostrud mollit."
				},
				{
					"by": "Bennett Hudson",
					"date": 379681524344,
					"message": "Occaecat anim quis ex sunt reprehenderit. Non enim amet ut consectetur sint quis exercitation qui."
				},
				{
					"by": "Johnston Conley",
					"date": 1294414962811,
					"message": "Ut laborum cupidatat id amet laborum. Aliqua non cillum voluptate irure laborum."
				}
			]
		},
		{
			"id": "55c16bdc3bc7e9a1598ead0e",
			"img": "http://api.randomuser.me/portraits/women/75.jpg",
			"age": 39,
			"name": "Myers Gibson",
			"company": "Comvey",
			"role": "velit pariatur",
			"email": "myers.gibson@comvey.biz",
			"phone": "+61883551296",
			"location": {
				"address": "860 Kings Place",
				"city": "Charco",
				"state": "Wyoming",
				"postalcode": 1858,
				"country": "Macau",
				"latitude": "35.966264",
				"longitude": "68.486228"
			},
			"tags": [
				"consectetur",
				"nulla",
				"sit",
				"id",
				"officia",
				"pariatur",
				"elit"
			],
			"resume": "http://placehold.it/1240x1754?text=Resume",
			"notes": [
				{
					"by": "Aguirre Mckenzie",
					"date": 1034068736930,
					"message": "Fugiat ut nostrud ullamco est aliqua eiusmod do consequat. Qui velit qui nostrud mollit."
				},
				{
					"by": "Bennett Hudson",
					"date": 379681524344,
					"message": "Occaecat anim quis ex sunt reprehenderit. Non enim amet ut consectetur sint quis exercitation qui."
				},
				{
					"by": "Johnston Conley",
					"date": 1294414962811,
					"message": "Ut laborum cupidatat id amet laborum. Aliqua non cillum voluptate irure laborum."
				}
			]
		},
		{
			"id": "55c16bdcbe6e1b1f871e462b",
			"img": "http://api.randomuser.me/portraits/men/36.jpg",
			"age": 36,
			"name": "Leola Cain",
			"company": "Vertide",
			"role": "sunt fugiat",
			"email": "leola.cain@vertide.me",
			"phone": "+61827404296",
			"location": {
				"address": "845 Brighton Court",
				"city": "Martinsville",
				"state": "Ohio",
				"postalcode": 435,
				"country": "Peru",
				"latitude": "-33.518164",
				"longitude": "106.588982"
			},
			"tags": [
				"consectetur",
				"nulla",
				"sit",
				"id",
				"officia",
				"pariatur",
				"elit"
			],
			"resume": "http://placehold.it/1240x1754?text=Resume",
			"notes": [
				{
					"by": "Aguirre Mckenzie",
					"date": 1034068736930,
					"message": "Fugiat ut nostrud ullamco est aliqua eiusmod do consequat. Qui velit qui nostrud mollit."
				},
				{
					"by": "Bennett Hudson",
					"date": 379681524344,
					"message": "Occaecat anim quis ex sunt reprehenderit. Non enim amet ut consectetur sint quis exercitation qui."
				},
				{
					"by": "Johnston Conley",
					"date": 1294414962811,
					"message": "Ut laborum cupidatat id amet laborum. Aliqua non cillum voluptate irure laborum."
				}
			]
		},
		{
			"id": "55c16bdcf0bf2766f1306d2a",
			"img": "http://api.randomuser.me/portraits/men/51.jpg",
			"age": 23,
			"name": "Jeannie Rasmussen",
			"company": "Waterbaby",
			"role": "aliqua quis",
			"email": "jeannie.rasmussen@waterbaby.com",
			"phone": "+61825584308",
			"location": {
				"address": "239 Corbin Place",
				"city": "Deputy",
				"state": "Marshall Islands",
				"postalcode": 7230,
				"country": "Falkland Islands (Malvinas)",
				"latitude": "16.093317",
				"longitude": "43.437916"
			},
			"tags": [
				"consectetur",
				"nulla",
				"sit",
				"id",
				"officia",
				"pariatur",
				"elit"
			],
			"resume": "http://placehold.it/1240x1754?text=Resume",
			"notes": [
				{
					"by": "Aguirre Mckenzie",
					"date": 1034068736930,
					"message": "Fugiat ut nostrud ullamco est aliqua eiusmod do consequat. Qui velit qui nostrud mollit."
				},
				{
					"by": "Bennett Hudson",
					"date": 379681524344,
					"message": "Occaecat anim quis ex sunt reprehenderit. Non enim amet ut consectetur sint quis exercitation qui."
				},
				{
					"by": "Johnston Conley",
					"date": 1294414962811,
					"message": "Ut laborum cupidatat id amet laborum. Aliqua non cillum voluptate irure laborum."
				}
			]
		},
		{
			"id": "55c16bdce85a606857117ef3",
			"img": "http://api.randomuser.me/portraits/women/55.jpg",
			"age": 27,
			"name": "Morgan Conner",
			"company": "Aclima",
			"role": "duis ea",
			"email": "morgan.conner@aclima.co.uk",
			"phone": "+61833520238",
			"location": {
				"address": "161 Monitor Street",
				"city": "Fedora",
				"state": "Utah",
				"postalcode": 6067,
				"country": "Anguilla",
				"latitude": "25.749758",
				"longitude": "-120.300845"
			},
			"tags": [
				"consectetur",
				"nulla",
				"sit",
				"id",
				"officia",
				"pariatur",
				"elit"
			],
			"resume": "http://placehold.it/1240x1754?text=Resume",
			"notes": [
				{
					"by": "Aguirre Mckenzie",
					"date": 1034068736930,
					"message": "Fugiat ut nostrud ullamco est aliqua eiusmod do consequat. Qui velit qui nostrud mollit."
				},
				{
					"by": "Bennett Hudson",
					"date": 379681524344,
					"message": "Occaecat anim quis ex sunt reprehenderit. Non enim amet ut consectetur sint quis exercitation qui."
				},
				{
					"by": "Johnston Conley",
					"date": 1294414962811,
					"message": "Ut laborum cupidatat id amet laborum. Aliqua non cillum voluptate irure laborum."
				}
			]
		},
		{
			"id": "55c16bdc5bcf1a290d697807",
			"img": "http://api.randomuser.me/portraits/women/85.jpg",
			"age": 39,
			"name": "Leanne Hanson",
			"company": "Mondicil",
			"role": "velit qui",
			"email": "leanne.hanson@mondicil.tv",
			"phone": "+61803541270",
			"location": {
				"address": "758 Dearborn Court",
				"city": "Crumpler",
				"state": "Delaware",
				"postalcode": 9878,
				"country": "Taiwan",
				"latitude": "-1.529341",
				"longitude": "8.435806"
			},
			"tags": [
				"consectetur",
				"nulla",
				"sit",
				"id",
				"officia",
				"pariatur",
				"elit"
			],
			"resume": "http://placehold.it/1240x1754?text=Resume",
			"notes": [
				{
					"by": "Aguirre Mckenzie",
					"date": 1034068736930,
					"message": "Fugiat ut nostrud ullamco est aliqua eiusmod do consequat. Qui velit qui nostrud mollit."
				},
				{
					"by": "Bennett Hudson",
					"date": 379681524344,
					"message": "Occaecat anim quis ex sunt reprehenderit. Non enim amet ut consectetur sint quis exercitation qui."
				},
				{
					"by": "Johnston Conley",
					"date": 1294414962811,
					"message": "Ut laborum cupidatat id amet laborum. Aliqua non cillum voluptate irure laborum."
				}
			]
		},
		{
			"id": "55c16bdceac6099d91d727fd",
			"img": "http://api.randomuser.me/portraits/women/92.jpg",
			"age": 33,
			"name": "Allison Tucker",
			"company": "Portalis",
			"role": "mollit proident",
			"email": "allison.tucker@portalis.biz",
			"phone": "+61968562346",
			"location": {
				"address": "956 Eagle Street",
				"city": "Gratton",
				"state": "Oregon",
				"postalcode": 3606,
				"country": "Virgin Islands (British)",
				"latitude": "-59.68963",
				"longitude": "-99.736683"
			},
			"tags": [
				"consectetur",
				"nulla",
				"sit",
				"id",
				"officia",
				"pariatur",
				"elit"
			],
			"resume": "http://placehold.it/1240x1754?text=Resume",
			"notes": [
				{
					"by": "Aguirre Mckenzie",
					"date": 1034068736930,
					"message": "Fugiat ut nostrud ullamco est aliqua eiusmod do consequat. Qui velit qui nostrud mollit."
				},
				{
					"by": "Bennett Hudson",
					"date": 379681524344,
					"message": "Occaecat anim quis ex sunt reprehenderit. Non enim amet ut consectetur sint quis exercitation qui."
				},
				{
					"by": "Johnston Conley",
					"date": 1294414962811,
					"message": "Ut laborum cupidatat id amet laborum. Aliqua non cillum voluptate irure laborum."
				}
			]
		},
		{
			"id": "55c16bdc029d6012c5db8c26",
			"img": "http://api.randomuser.me/portraits/men/47.jpg",
			"age": 29,
			"name": "Montoya Lee",
			"company": "Powernet",
			"role": "quis ipsum",
			"email": "montoya.lee@powernet.org",
			"phone": "+61977425356",
			"location": {
				"address": "622 Rose Street",
				"city": "Dellview",
				"state": "California",
				"postalcode": 1585,
				"country": "Lebanon",
				"latitude": "-10.298446",
				"longitude": "81.5396"
			},
			"tags": [
				"consectetur",
				"nulla",
				"sit",
				"id",
				"officia",
				"pariatur",
				"elit"
			],
			"resume": "http://placehold.it/1240x1754?text=Resume",
			"notes": [
				{
					"by": "Aguirre Mckenzie",
					"date": 1034068736930,
					"message": "Fugiat ut nostrud ullamco est aliqua eiusmod do consequat. Qui velit qui nostrud mollit."
				},
				{
					"by": "Bennett Hudson",
					"date": 379681524344,
					"message": "Occaecat anim quis ex sunt reprehenderit. Non enim amet ut consectetur sint quis exercitation qui."
				},
				{
					"by": "Johnston Conley",
					"date": 1294414962811,
					"message": "Ut laborum cupidatat id amet laborum. Aliqua non cillum voluptate irure laborum."
				}
			]
		},
		{
			"id": "55c16bdc9bc6e400d461069c",
			"img": "http://api.randomuser.me/portraits/men/86.jpg",
			"age": 29,
			"name": "Lakisha Weber",
			"company": "Paragonia",
			"role": "in ex",
			"email": "lakisha.weber@paragonia.net",
			"phone": "+61896552391",
			"location": {
				"address": "436 Schenck Place",
				"city": "Singer",
				"state": "Guam",
				"postalcode": 6656,
				"country": "Jordan",
				"latitude": "-1.829143",
				"longitude": "144.547949"
			},
			"tags": [
				"consectetur",
				"nulla",
				"sit",
				"id",
				"officia",
				"pariatur",
				"elit"
			],
			"resume": "http://placehold.it/1240x1754?text=Resume",
			"notes": [
				{
					"by": "Aguirre Mckenzie",
					"date": 1034068736930,
					"message": "Fugiat ut nostrud ullamco est aliqua eiusmod do consequat. Qui velit qui nostrud mollit."
				},
				{
					"by": "Bennett Hudson",
					"date": 379681524344,
					"message": "Occaecat anim quis ex sunt reprehenderit. Non enim amet ut consectetur sint quis exercitation qui."
				},
				{
					"by": "Johnston Conley",
					"date": 1294414962811,
					"message": "Ut laborum cupidatat id amet laborum. Aliqua non cillum voluptate irure laborum."
				}
			]
		},
		{
			"id": "55c16bdc254f8832521baa14",
			"img": "http://api.randomuser.me/portraits/women/95.jpg",
			"age": 34,
			"name": "Andrews Rivers",
			"company": "Eplosion",
			"role": "ad Lorem",
			"email": "andrews.rivers@eplosion.us",
			"phone": "+61959512292",
			"location": {
				"address": "295 Columbia Street",
				"city": "Gwynn",
				"state": "Louisiana",
				"postalcode": 4226,
				"country": "South Africa",
				"latitude": "10.750877",
				"longitude": "-99.479152"
			},
			"tags": [
				"consectetur",
				"nulla",
				"sit",
				"id",
				"officia",
				"pariatur",
				"elit"
			],
			"resume": "http://placehold.it/1240x1754?text=Resume",
			"notes": [
				{
					"by": "Aguirre Mckenzie",
					"date": 1034068736930,
					"message": "Fugiat ut nostrud ullamco est aliqua eiusmod do consequat. Qui velit qui nostrud mollit."
				},
				{
					"by": "Bennett Hudson",
					"date": 379681524344,
					"message": "Occaecat anim quis ex sunt reprehenderit. Non enim amet ut consectetur sint quis exercitation qui."
				},
				{
					"by": "Johnston Conley",
					"date": 1294414962811,
					"message": "Ut laborum cupidatat id amet laborum. Aliqua non cillum voluptate irure laborum."
				}
			]
		}
	]
};

function term(matcher, generate) {
	if ((typeof matcher === 'undefined') || (typeof generate === 'undefined')) {
		throw 'Matcher and Generate arguments must be specified to use Term';
	}
	return {
		"json_class": "Pact::Term",
		"data": {
			"generate": generate,
			"matcher": {
				"json_class": "Regexp",
				"o": 0,
				"s": matcher
			}
		}
	};
}

function somethingLike(value) {
	return {
		"json_class": "Pact::SomethingLike",
		"contents": value
	};
}

module.exports = function (done) {

	var requestHeaders = {
		/*'Accept': 'application/vnd.formsbuilderapi-v1+json',
		 'Authorization': 'Bearer locksmith_user_id=user_34567|locksmith_instance_id=34567'*/
	};
	var responseHeaders = {
		'Content-Type': 'application/json;charset=utf-8'
	};
	var jsonRequestHeaders = {
		'Content-Type': term('application/json', 'application/json;charset=utf-8')/*,
		 'Accept': requestHeaders.Accept,
		 'Authorization': requestHeaders.Authorization*/
	};

	var guidRegex = '/[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}';

	function wrapRegex(value) {
		return '^' + value + '$';
	}

	pact(function (mockService) {

		mockService
			.given('a search query')
			.uponReceiving('a search GET request with a query')
			.withRequest({method: 'get', path: '/search', query: term('q=.*', 'q=test'), headers: requestHeaders})
			.willRespondWith({
				status: 200,
				headers: responseHeaders,
				body: mockWithResults
			});

		mockService
			.given('a search query')
			.uponReceiving('a search GET request with no query')
			.withRequest({method: 'get', path: '/search', query: '', headers: requestHeaders})
			.willRespondWith({
				status: 200,
				headers: responseHeaders,
				body: mockWithoutResults
			});


		// Commenting this out for now, not sure if we'll actually need it
		// Get form instance from form context and instance id
		/*mockService
		 .given('a form context id and an instance id')
		 .uponReceiving('a GET request with a valid id for both')
		 .withRequest('get', term(wrapRegex(guidRegex + guidRegex), '/' + contextId + '/' + instanceId), requestHeaders)
		 .willRespondWith({
		 status: 200,
		 headers: responseHeaders,
		 body: mock
		 });

		 // Save form in progress
		 mockService
		 .given('a form context id and an instance id')
		 .uponReceiving('a PUT request with a form json')
		 .withRequest('put', term(wrapRegex(guidRegex + guidRegex), '/' + contextId + '/' + instanceId), jsonRequestHeaders, somethingLike(saveMock))
		 .willRespondWith({
		 status: 200
		 });

		 // Submit form
		 mockService
		 .given('a form context id and an instance id')
		 .uponReceiving('a POST request with a form json')
		 .withRequest('post', term(wrapRegex(guidRegex + guidRegex), '/' + contextId + '/' + instanceId), jsonRequestHeaders, somethingLike(saveMock))
		 .willRespondWith({
		 status: 200
		 });*/


		done();
	});
};
