var path = require('path'),
	pact = require('pact-node'),
	dsl = require('pact-consumer-js-dsl');

describe('Todo', function () {
	var server, mockService;
	beforeAll(function (done) {
		mockService = dsl.mockService({
			consumer: 'demo',
			provider: 'demo-api',
			port:9100,
			done: function(){}
		});
		server = pact.create({port: 9100}).start().then(function(){
			done();
		});
	});

	afterAll(function (done) {
		server.stop().then(function(){
			done();
		});
	});

	beforeEach(function () {
		browser.get('/#/');
	});

	afterEach(function(done){
		mockService.clean(done);
	});

	describe('Initial', function () {

		it('Should show new todo', function () {
			expect(element(by.binding('newTodo'))).toBeTruthy();
		});

		it('Should add new todo', function () {
			mockService
				.given('user inputs todo')
				.uponReceiving('something')
				.withRequest({
					path:'/',
					body:'something'
				})
				.willRespondWith({status:200});

			element(by.binding('newTodo')).sendKeys('something', protractor.Key.ENTER);
			expect(element(by.repeater('todo in todos').row(0))).toBeTruthy();
		});
		/*
		 it('Should display the form title', function (done) {
		 var el = element(by.css('.form-runner'));
		 el.evaluate('form.label').then(function(value){
		 expect(el.element(by.binding('form.label')).getText()).toBe(value);
		 done();
		 });
		 });

		 it('Should display a submit button', function () {
		 var btn = element(by.css('[ng-click="submit()"]'));
		 expect(btn.isDisplayed()).toBeTruthy();
		 });

		 it('Should display a save state', function () {
		 var state = element(by.css('.navbar-save'));
		 expect(state.isDisplayed()).toBeTruthy();
		 expect(state.getText()).toBe('Saved');
		 });

		 it('Should show data as unchanged', function () {
		 expect(element(by.css('.has-changes')).isPresent()).toBeFalsy();
		 });*/
	});

	/*


	 describe('saving state indicator', function () {

	 it('Should indicate that the form is already saved when initializing', function () {
	 var el = element(by.css('.navbar-save'));
	 expect(el.getAttribute('class')).not.toMatch('dirty');
	 expect(el.getText()).toBe('Saved');
	 });

	 it('Should indicate that there are changes to save when data is changed', function (done) {
	 browser.get('/#/336ff8cc-ca96-46fa-8bf5-bcb35da3ecb2/e0873a45-c1f7-4cf8-98b3-b6f93cadb0fc');
	 var textbox = element.all(by.css('input[type="text"]')).get(0);
	 textbox.sendKeys('test').then(function () {
	 var el = element(by.css('.navbar-save.dirty'));
	 expect(el.isPresent()).toBeTruthy();
	 expect(el.getText()).toBe('Saving...');

	 // Waits for the save to complete before continuing
	 browser.wait(function () {
	 return el.isPresent().then(function (value) {
	 return !value;
	 });
	 }, 5000).then(function () {
	 expect(el.isPresent()).toBeFalsy();
	 el = element(by.css('.navbar-save'));
	 expect(el.isPresent()).toBeTruthy();
	 expect(el.getText()).toBe('Saved');
	 done();
	 });

	 });
	 });
	 });

	 describe('Section completeness', function() {

	 // Find first field with required=true
	 function getFirstRequiredField(locator) {
	 var deferred = protractor.promise.defer();
	 var els = element.all(locator);

	 function nextField(index) {
	 var el = els.get(index);
	 el.evaluate('element.required').then(function (value) {
	 if (value) {
	 deferred.fulfill(el);
	 }
	 else {
	 nextField(index++);
	 }
	 });
	 }

	 nextField(0);
	 return deferred.promise;
	 }

	 function getFirstRequiredTextInput() {
	 var deferred = protractor.promise.defer();
	 getFirstRequiredField(by.css('.form-element.text')).then(function (el) {
	 el.element(by.css('input')).then(function (input) {
	 deferred.fulfill(input);
	 });
	 });
	 return deferred.promise;
	 }

	 it('should show check on complete sections', function() {

	 expect(element.all(by.css('.panel-heading .check .fa-check')).reduce(function (acc, el) {
	 return el.getAttribute('class').then(function (val) {
	 return acc && !!val.match(/\bcomplete\b/);
	 });
	 }, true)).toBeTruthy();

	 });

	 it('should show greyed check on incomplete sections', function(done) {
	 getFirstRequiredTextInput().then(function (el) {
	 el.clear().then(function() {
	 var btn = element(by.css('[ng-click="submit()"]'));
	 btn.click().then(function () {
	 expect(element.all(by.css('.panel-heading .check .fa-check')).reduce(function (acc, el) {
	 return el.getAttribute('class').then(function (val) {
	 return acc && !!val.match(/\bcomplete\b/);
	 });
	 }, true)).toBeFalsy();
	 done();
	 });
	 });
	 });
	 });

	 xit('should focus first incomplete field and expand related section on submit', function(done) {
	 getFirstRequiredTextInput().then(function (el) {
	 el.clear().then(function() {
	 var secondSectionOpener = element.all(by.css('.panel-heading .accordion-toggle')).get(1);
	 secondSectionOpener.click().then(function() {
	 var firstSectionPanel = element.all(by.css('.section')).first();
	 firstSectionPanel.getAttribute('class').then(function(val) {
	 //should start closed
	 expect(val.match(/\bopenend\b/)).toBeFalsy();
	 expect(browser.driver.switchTo().activeElement()).not.toBe(el);

	 //then opens after click
	 var btn = element(by.css('[ng-click="submit()"]'));
	 btn.click().then(function () {
	 firstSectionPanel.getAttribute('class').then(function(val) {
	 expect(val.match(/\bopenened\b/)).toBeTruthy();
	 expect(browser.driver.switchTo().activeElement()).toBe(el);
	 done();
	 });
	 });

	 });
	 });

	 });
	 });
	 });


	 });

	 describe('Submit', function () {

	 it('Should be able to submit changes', function (done) {
	 var btn = element(by.css('[ng-click="submit()"]'));
	 btn.click().then(function () {
	 expect(element(by.css('.has-changes')).isPresent()).toBeFalsy();
	 done();
	 });
	 });

	 });*/
});
