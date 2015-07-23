$(window).scroll(function(){
	if ($(window).width() > 1200) {
		if ($(this).scrollTop() > 280) {
			$('.project-info').addClass('fixed');
		} else {
			$('.project-info').removeClass('fixed');
		}
	}
	if ($(window).scrollTop() >= $(document).height() - $(window).height() - 900) {
		$('.project-info').fadeOut(200);
	}else{
		$('.project-info').fadeIn(200);
	}

});

(function(){

	window.App = {
		Models: {},
		Collections: {},
		Views: {},
		Router: {}
	};

	window.template = function(id){
		return _.template( $("#" + id).html() );
	};

	// Use {{ }} as an interpolation instead of <% %> in jade files
	_.templateSettings = {
		evaluate    : /\{\{([\s\S]+?)\}\}/g,
		interpolate : /\{\{=([\s\S]+?)\}\}/g,
		escape      : /\{\{-([\s\S]+?)\}\}/g
	};

	var vent = _.extend({}, Backbone.Events);


	App.Models.Project = Backbone.Model.extend({
	});


	App.Collections.Projects = Backbone.Collection.extend({
		model: App.Models.Project
	});

	App.Models.ProjectView = Backbone.Model.extend({
	});


	App.Views.ProjectViewer = Backbone.View.extend({
		el: '.project-viewer',
		template: _.template(_.unescape($("#project-view-template").html()) ),

		initialize: function(projectId){
			vent.on('show:project', this.show, this);
		},

		show: function(project){
			this.model = project;
			var data = this.template( this.model.toJSON() );
			this.$el.html(data); 
			return this;
		}
	});


	App.Views.Projects = Backbone.View.extend({
		tagName: 'div',
		className: 'project-container',


		initialize: function(){

			$(".project-container").append(this.render().el);
		},

		render: function(){

			this.collection.each( this.addOne, this);
			return this;
		},

		addOne: function(project){
			var projectView = new App.Views.Project({ model: project });

			this.$el.append( projectView.render().el);
		}

	});

	App.Views.Project = Backbone.View.extend({
		tagName: 'div',

		template: _.template(_.unescape($("#project-template").html()) ),
		events: {
			'click' : 'showProject'
		},

		showProject: function(e){
			e.preventDefault();
			window.scrollTo(0, 0);

			vent.trigger('show:project', this.model);
			var target = $(e.currentTarget).find("a").attr("href");
			router.navigate(target, {trigger: true});
		},

		render: function(){
			var data = this.template( this.model.toJSON() );
			this.$el.html(data); 
			return this;
		}
	});


	var projectsCollection = new App.Collections.Projects([
		{
			projectTitle: 'optibooks',
			projectImage: '../images/project-2.jpg',
			projectDescription: 'optibooks aims to improve client service by providing a solution to capture, workflow, and securely stores documents online.',
			projectLink: '/project/optibooks',
			projectUrl: 'optibooks.com',
			projectRoles: ["Wireframing", "UI design", "Frontend development"],
			projectScreen1: '../images/project-1-screen4.jpg',
			projectScreen2: '../images/project-1-screen5.jpg',
			projectScreen3: '../images/project-1-screen3.jpg',
			projectScreen4: '../images/project-1-screen1.jpg',
			projectScreen5: '../images/project-1-screen2.jpg',
			projectScreen6: '',
			projectScreen7: '',
			projectScreen8: '',
			projectScreen9: '',
			projectScreen10: ''
		},
		{
			projectTitle: 'ingenuity',
			projectImage: '../images/project-1.jpg',
			projectDescription: 'Ingenuity is a software development company proudly based in Davao. It was an honor to visualize and create their logo, brand collaterals and website. Fun-filled and smart-ass devs lurk around the office. They made it easy for me to capture what they do and who they are, eventually reflect it to the design.',
			projectLink: '/project/ingenuity',
			projectUrl: 'ingenuity.ph',
			projectRoles: ["Branding", "Visual design", "Logo design", "Web design", "Frontend development"],
			projectScreen1: '../images/project-2-screen1.jpg',
			projectScreen2: '../images/project-2-screen2.jpg',
			projectScreen3: '../images/project-2-screen3.jpg',
			projectScreen4: '../images/project-2-screen4.jpg',
			projectScreen5: '../images/project-2-screen5.jpg',
			projectScreen6: '../images/project-2-screen6.jpg',
			projectScreen7: '../images/project-2-screen7.jpg',
			projectScreen8: '',
			projectScreen9: '',
			projectScreen10: ''
		},
		{
			projectTitle: 'Jobpostit',
			projectImage: '../images/project-4.jpg',
			projectDescription: 'Job posting site for IT',
			projectLink: '/project/jobpostit',		   
			projectUrl: '',
			projectRoles: ["Wireframing", "Visual design", "Frontend development"],
			projectScreen1: '../images/project-4-screen2.jpg',
			projectScreen2: '../images/project-4-screen1.jpg',
			projectScreen3: '',
			projectScreen4: '',
			projectScreen5: '',
			projectScreen6: '',
			projectScreen7: '',
			projectScreen8: '',
			projectScreen9: '',
			projectScreen10: ''
		},
		{
			projectTitle: 'optibpo',
			projectImage: '../images/project-6.jpg',
			projectDescription: 'optibpo provides innovative solutions for the outsourcing of accounting prcoess, for accouting firms, and small to medium enterprises',
			projectLink: '/project/optibpo',
			projectUrl: 'optibpo.com',
			projectRoles: ["Branding", "Logo design", "Collateral design", "Web design", "Frontend development"],
			projectScreen1: '../images/project-6-screen1.jpg',
			projectScreen2: '../images/project-6-screen2.jpg',
			projectScreen3: '../images/project-6-screen3.jpg',
			projectScreen4: '../images/project-6-screen4.jpg',
			projectScreen5: '../images/project-6-screen5.jpg',
			projectScreen6: '../images/project-6-screen6.jpg',
			projectScreen7: '../images/project-6-screen7.jpg',
			projectScreen8: '../images/project-6-screen8.jpg',
			projectScreen9: '../images/project-6-screen9.jpg',
			projectScreen10: '../images/project-6-screen10.jpg'
		},
		{
			projectTitle: 'andyaparece',
			projectImage: '../images/project-5.jpg',
			projectDescription: 'Personal porfolio of Andy Aparece. The double A symbol is clear and straighforward, coming from the word "Aparece" which means "to appear" in Spanish.',
			projectLink: '/project/andyaparece',
			projectUrl: 'andyaparece.com',
			projectRoles: ["Branding", "Web design", "Frontend development"],
			projectScreen1: '../images/project-5-screen1.jpg',
			projectScreen2: '../images/project-5-screen2.jpg',
			projectScreen3: '',
			projectScreen4: '',
			projectScreen5: '',
			projectScreen6: '',
			projectScreen7: '',
			projectScreen8: '',
			projectScreen9: '',
			projectScreen10: ''
		},
		{
			projectTitle: 'AARRF',
			projectImage: '../images/project-3.jpg',
			projectDescription: 'AARRF is a search engine/scraper for open source applications. This is an old project from school.',
			projectLink: '/project/AARRF',
			projectUrl: '',
			projectRoles: ["UI Design", "Frontend development", "Backend development"],
			projectScreen1: '../images/project-3-screen1.jpg',
			projectScreen2: '../images/project-3-screen2.jpg',
			projectScreen3: '',
			projectScreen4: '',
			projectScreen5: '',
			projectScreen6: '',
			projectScreen7: '',
			projectScreen8: '',
			projectScreen9: '',
			projectScreen10: ''
		},

		
	]);

	var projectView = new App.Views.Projects({ collection: projectsCollection });
	var projectViewer = new App.Views.ProjectViewer({ collection: projectsCollection });
	


	App.Views.ContactButtonShow = Backbone.View.extend({
		el: '.contact',

		initialize: function(){
		},

		events: {
			'click': 'show'
		},

		show: function(e){
			e.preventDefault();
			router.navigate('contact', {trigger: true});
		}
	});

	var test = new App.Views.ContactButtonShow;


	_.extend(Backbone.Validation.callbacks, {
		valid: function (view, attr, selector) {
			var $el = view.$('[name=' + attr + ']'), 
				$group = $el.closest('.form-group'),
				$input = $el.closest('input');
			
				$input.removeClass('has-error');
				$group.find('.help-block').html('').addClass('hidden');
		},
		invalid: function(view, attr, error) {
			var $el = view.$('[name=' + attr + ']'), 
				$group = $el.closest('.form-group'),
				$input = $el.closest('input');
				
				$input.addClass('has-error');
				$group.find('.help-block').html(error).removeClass('hidden');
		}
	});


	App.Models.Contact = Backbone.Model.extend({
		urlRoot: '/contact',
		validation: {
			name: {
				required: true
				// msg: 'Silly, you forgot your name'
			},
			email: {
				required: true,
				pattern: 'email'
				// msg: 'Valid email please, I won\'t spam'
			},
			message: {
				// required: true,
				// msg: 'No message for me? :('
			}
		}
	});

	var contact = new App.Models.Contact;


	App.Views.ContactView = Backbone.View.extend({
		tagName: 'div',
		className: 'contact-view',
		template: _.template(_.unescape($("#contact-form").html()) ),

		initialize: function(){
			 Backbone.Validation.bind(this, {
			 	forceUpdate: true
			 });
			
			$('body').prepend(this.render().el);
		},

		events: {
			'click .close': 'hideForm',
			'click .submit': function (e) {
				e.preventDefault();
				this.submit(e);
			}
		},

		bindings: {
			'[name=name]': {
				observe: 'name',
				setOptions: {
					validate: true
				}
			},
			'[name=email]': {
				observe: 'email',
				setOptions: {
					validate: true
				}
			}
		},

		submit: function(e){

			var form = this.$el.find('form');
			var data = form.serializeObject();

			this.model.set(data);

			var that = this;
			
			// Check if the model is valid before saving
			// See: http://thedersen.com/projects/backbone-validation/#methods/isvalid
			if(this.model.isValid(true)){
				$(e.currentTarget).val('Sending message');
				this.model.save([], {
					dataType:"text",
					success: function(){
						form.find('input[type="text"]').val('');
						form.find('textarea[type="text"]').val('');
						$(e.currentTarget).addClass('disabled').val('Sent');
						$(e.currentTarget).next().addClass('flash-success').removeClass('hidden');

						// that.remove();
					},
					error: function(){
						$(e.currentTarget).addClass('disabled').val('Send message');
						$(e.currentTarget).next().html('An error occured. Please try again');
						$(e.currentTarget).next().addClass('flash-error').removeClass('hidden');
						console.log("no");
					}
				});


				// alert('Great Success!');

			}	
		},

		remove: function() {
			// Remove the validation binding
			// See: http://thedersen.com/projects/backbone-validation/#using-form-model-validation/unbinding
			Backbone.Validation.unbind(this);
			return Backbone.View.prototype.remove.apply(this, arguments);
		},

		hideForm: function(e){
			e.preventDefault();
			this.$el.fadeOut(400);
			window.history.back()
		},

		render: function(){
			this.$el.html(this.template).fadeIn(200);
			this.stickit();
			return this;
		}
	});


	App.Router = Backbone.Router.extend({

		routes: {
			'' : 'index',
			'project/:projectId': 'projectShow',
			'contact': 'showContact'
		},

		projectShow: function(projectId){

			var project = projectsCollection.find(function(model) { 
				return model.get('projectTitle') == projectId;
			});
			vent.trigger('show:project', project);
		},

		showContact: function(){
			var contactView = new App.Views.ContactView({ model: contact });
		}
	});

	var router = new App.Router;
	Backbone.history.start();


	// https://github.com/hongymagic/jQuery.serializeObject
	$.fn.serializeObject = function () {
		"use strict";
		var a = {}, b = function (b, c) {
			var d = a[c.name];
			"undefined" != typeof d && d !== null ? $.isArray(d) ? d.push(c.value) : a[c.name] = [d, c.value] : a[c.name] = c.value
		};
		return $.each(this.serializeArray(), b), a
	};


})();

