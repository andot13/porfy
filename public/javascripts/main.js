$(window).scroll(function(){
	if ($(window).width() > 1200) {
		if ($(this).scrollTop() > 480) {
			$('.project__viewer-info--non-fixed').addClass('fixed');
		} else {
			$('.project__viewer-info--non-fixed').removeClass('fixed');
		}
	}
	if ($(window).scrollTop() >= $(document).height() - $(window).height() - 5000) {
		$('.project__viewer-info--non-fixed').fadeOut(200);
	}else{
		$('.project__viewer-info--non-fixed').fadeIn(200);
	}

});

$(function(){

      var ApplicationRouter = Backbone.Router.extend({

          //map url routes to contained methods
          routes: {
              "": "home",
              "about": "about",
              "contact": "contact",
              "*path": "home"
          },

          deselectPills: function(){
              //deselect all navigation pills
              $('ul.pills li').removeClass('active');
          },

          selectPill: function(pill){
              //deselect all navigation pills
              this.deselectPills();
              //select passed navigation pill by selector
              $(pill).addClass('active');
          },

          hidePages: function(){
              //hide all pages with 'pages' class
              $('div.pages').hide();
          },

          showPage: function(page){
              //hide all pages
              this.hidePages();
              //show passed page by selector
              $(page).show();
          },



          about: function() {
          	$('.intro-container').hide();
              this.showPage('div#about-page');
              this.selectPill('li.about-pill');
          },

          contact: function() {
          	$('.intro-container').hide();
              this.showPage('div#contact-page');
              this.selectPill('li.contact-pill');
          }

      });

      var ApplicationView = Backbone.View.extend({

          //bind view to body element (all views should be bound to DOM elements)
          el: $('body'),

          //observe navigation click events and map to contained methods
          events: {
          
              'click ul.pills li.about-pill a': 'displayAbout',
              'click ul.pills li.contact-pill a': 'displayContact'
          },

          //called on instantiation
          initialize: function(){
              //set dependency on ApplicationRouter
              this.router = new ApplicationRouter();
              $("#about-page").hide();
              $("#contact-page").hide();

              //call to begin monitoring uri and route changes
              Backbone.history.start();
          },

 
          displayAbout: function(e){
              //update url and pass true to execute route method
              e.preventDefault();
              this.router.navigate("about", true);
          },

          displayContact: function(e){
              //update url and pass true to execute route method
              e.preventDefault();
              this.router.navigate("contact", true);
          }

      });

      //load application
      new ApplicationView();

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
		el: '.project__viewer',
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
		className: 'project',


		initialize: function(){

			$(".project").append(this.render().el);
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
			projectTitle: 'ClassCover',
			projectImage: '../images/cc-cover1.gif',
			projectImage2: '../images/classcover-main-prototype-flinto.gif',
			projectVideo: '../images/videos/quick-booking-invite-booking.mov',
			projectDate: 'March 2016 - April 2018',
			projectDescription: 'ClassCover is a platform that connects schools directly with their chosen relief teachers, allowing them to book teachers anywhere at anytime.',
			projectLink: '/project/classcover',
			projectUrl: 'http://classcover.com.au',
      		projectDesignation: 'Product Designer',
			projectRoles: ["Product Design", "Interaction Design","Prototyping", "Front-end development"],
			projectScreen1: '../images/cc-school-calendar.png',
			projectScreen2: '../images/cc-cover2.gif',
			projectScreen3: '../images/cc-school-myteacher-empty.png',
			projectScreen4: '../images/cc-rh2.png',
			projectScreen5: '../images/cc-messaging.png',
			projectScreen6: '../images/cc-cover1.gif',
			projectScreen7: '../images/cc-request-history.png',
			projectScreen8: '../images/cc-school-taglist.png',
			projectScreen9: '../images/cc-school-myteacher2.png',
			projectScreen10: ''
		},
		{
			projectTitle: 'Blackboard Design System',
			projectImage: '../images/cc-ds-cover.png',
			projectImage2: '../images/classcover-main-prototype-flinto.gif',
			projectVideo: '../images/videos/quick-booking-invite-booking.mov',
			projectDate: 'March 2016 - April 2018',
			projectDescription: 'Blackboard design system is ClassCover\'s single source of truth, ensuring consistency across the product.',
			projectLink: '/project/classcover',
			projectUrl: 'http://classcover.com.au',
      		projectDesignation: 'Lead Designer',
			projectRoles: ["Lead Designer", "Design Systems"],
			projectScreen1: '../images/bb-color.png',
			projectScreen2: '../images/bb-typography.png',
			projectScreen3: '../images/bb-spacing.png',
			projectScreen4: '../images/bb-atoms.png',
			projectScreen5: '../images/bb-molecules.png',
			projectScreen6: '../images/bb-organisms.png',
			projectScreen7: '../images/bb-datepicker.png',
			projectScreen8: '../images/bb-datatables.png',
			projectScreen9: '../images/bb-forms.png',
			projectScreen10: '../images/bb-result.png'
		},
		{
			projectTitle: 'Optibooks',
			projectImage: '../images/project-2.jpg',
			projectImage2: '../images/classcover-main-prototype-flinto.gif',
			projectDate: 'Jan 2014 - Feb 2016',
			projectDescription: 'Optibooks aims to improve client service by providing a solution to capture, workflow, and securely stores documents online.',
			projectLink: '/project/optibooks',
			projectUrl: 'http://optibooks.com',
      projectDesignation: 'Lead Designer / Front-end Developer',
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
			projectTitle: 'Ingenuity',
			projectImage: '../images/project-1.jpg',
			projectImage2: '../images/classcover-main-prototype-flinto.gif',
			projectDate: 'Dec 2012 - 2013',
			projectDescription: 'Ingenuity is a software development company based in Davao. It was fun to visualize their logo, brand collaterals and website. Easy-going and smart devs lurk around the office. They made it easy for me to capture what they do and who they are, eventually reflect it to the design.',
			projectLink: '/project/ingenuity',
			projectUrl: 'http://ingenuity.ph',
      projectDesignation: 'Designer',
			projectRoles: ["Branding", "Visual design", "Logo design", "Web design", "Front-end development"],
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
		// {
		// 	projectTitle: 'Jobpostit',
		// 	projectImage: '../images/project-4.jpg',
		// 	projectImage2: '../images/classcover-main-prototype-flinto.gif',
		// 	projectDescription: 'Job posting site for IT',
		// 	projectLink: '/project/jobpostit',		   
		// 	projectUrl: '',
    //   projectDesignation: 'Product Designer',
		// 	projectRoles: ["Wireframing", "Visual design", "Frontend development"],
		// 	projectScreen1: '../images/project-4-screen2.jpg',
		// 	projectScreen2: '../images/project-4-screen1.jpg',
		// 	projectScreen3: '',
		// 	projectScreen4: '',
		// 	projectScreen5: '',
		// 	projectScreen6: '',
		// 	projectScreen7: '',
		// 	projectScreen8: '',
		// 	projectScreen9: '',
		// 	projectScreen10: ''
		// },
		{
			projectTitle: 'optibpo',
			projectImage: '../images/project-6.jpg',
			projectImage2: '../images/classcover-main-prototype-flinto.gif',
			projectDate: '2015',
			projectDescription: 'optibpo provides innovative solutions for the outsourcing of accounting prcoess, for accouting firms, and small to medium enterprises',
			projectLink: '/project/optibpo',
			projectUrl: 'http://optibpo.com',
      		projectDesignation: 'Brand Designer',
			projectRoles: ["Branding", "Logo design", "Collateral design", "Web design", "Front-end development"],
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
			projectImage2: '../images/classcover-main-prototype-flinto.gif',
			projectDate: '2012',
			projectDescription: 'Personal porfolio of Andy Aparece. The double A symbol is clear and straighforward, coming from the word "Aparece" which means "to appear" in Spanish.',
			projectLink: '/project/andyaparece',
			projectUrl: 'http://andyaparece.com',
      projectDesignation: 'Personal',
			projectRoles: ["Branding", "Web design", "Front-end development"],
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
		}
		// {
		// 	projectTitle: 'AARRF',
		// 	projectImage: '../images/classcover-teachers.gif',
		// 	projectImage2: '../images/classcover-main-prototype-flinto.gif',
		// 	projectDescription: 'AARRF is a search engine/scraper for open source applications. This is an old project from school.',
		// 	projectLink: '/project/AARRF',
		// 	projectUrl: '',
    //   projectDesignation: 'Product Designer',
		// 	projectRoles: ["UI Design", "Frontend development", "Backend development"],
		// 	projectScreen1: '../images/project-3-screen1.jpg',
		// 	projectScreen2: '../images/project-3-screen2.jpg',
		// 	projectScreen3: '',
		// 	projectScreen4: '',
		// 	projectScreen5: '',
		// 	projectScreen6: '',
		// 	projectScreen7: '',
		// 	projectScreen8: '',
		// 	projectScreen9: '',
		// 	projectScreen10: ''
		// },

		
	]);

	var projectView = new App.Views.Projects({ collection: projectsCollection });
	var projectViewer = new App.Views.ProjectViewer({ collection: projectsCollection });
	


	// App.Views.ContactButtonShow = Backbone.View.extend({
	// 	el: '.navigation__item--contact',

	// 	initialize: function(){
	// 	},

	// 	events: {
	// 		'click': 'show'
	// 	},

	// 	show: function(e){
	// 		e.preventDefault();
	// 		router.navigate('contact', {trigger: true});
	// 	}
	// });

	// var test = new App.Views.ContactButtonShow;


	// _.extend(Backbone.Validation.callbacks, {
	// 	valid: function (view, attr, selector) {
	// 		var $el = view.$('[name=' + attr + ']'), 
	// 			$group = $el.closest('.form-group'),
	// 			$input = $el.closest('input');
			
	// 			$input.removeClass('has-error');
	// 			$group.find('.help-block').html('').addClass('hidden');
	// 	},
	// 	invalid: function(view, attr, error) {
	// 		var $el = view.$('[name=' + attr + ']'), 
	// 			$group = $el.closest('.form-group'),
	// 			$input = $el.closest('input');
				
	// 			$input.addClass('has-error');
	// 			$group.find('.help-block').html(error).removeClass('hidden');
	// 	}
	// });


	// App.Models.Contact = Backbone.Model.extend({
	// 	urlRoot: '/contact',
	// 	validation: {
	// 		name: {
	// 			required: true
	// 			// msg: 'Silly, you forgot your name'
	// 		},
	// 		email: {
	// 			required: true,
	// 			pattern: 'email'
	// 			// msg: 'Valid email please, I won\'t spam'
	// 		},
	// 		message: {
	// 			// required: true,
	// 			// msg: 'No message for me? :('
	// 		}
	// 	}
	// });

	// var contact = new App.Models.Contact;


	// App.Views.ContactView = Backbone.View.extend({
	// 	tagName: 'div',
	// 	className: 'contact__view',
	// 	template: _.template(_.unescape($("#contact-form").html()) ),

	// 	initialize: function(){
	// 		 Backbone.Validation.bind(this, {
	// 		 	forceUpdate: true
	// 		 });
			
	// 		$('body').prepend(this.render().el);
	// 	},

	// 	events: {
	// 		'click .close': 'hideForm',
	// 		'click .submit': function (e) {
	// 			e.preventDefault();
	// 			this.submit(e);
	// 		}
	// 	},

	// 	bindings: {
	// 		'[name=name]': {
	// 			observe: 'name',
	// 			setOptions: {
	// 				validate: true
	// 			}
	// 		},
	// 		'[name=email]': {
	// 			observe: 'email',
	// 			setOptions: {
	// 				validate: true
	// 			}
	// 		}
	// 	},

	// 	submit: function(e){

	// 		var form = this.$el.find('form');
	// 		var data = form.serializeObject();

	// 		this.model.set(data);

	// 		var that = this;
			
	// 		// Check if the model is valid before saving
	// 		// See: http://thedersen.com/projects/backbone-validation/#methods/isvalid
	// 		if(this.model.isValid(true)){
	// 			$(e.currentTarget).val('Sending message');
	// 			this.model.save([], {
	// 				dataType:"text",
	// 				success: function(){
	// 					form.find('input[type="text"]').val('');
	// 					form.find('textarea[type="text"]').val('');
	// 					$(e.currentTarget).addClass('disabled').val('Sent');
	// 					$(e.currentTarget).next().addClass('flash--success').removeClass('hidden');

	// 					// that.remove();
	// 				},
	// 				error: function(){
	// 					$(e.currentTarget).addClass('disabled').val('Send message');
	// 					$(e.currentTarget).next().html('An error occured. Please try again');
	// 					$(e.currentTarget).next().addClass('flash--error').removeClass('hidden');
	// 					console.log("no");
	// 				}
	// 			});


	// 			// alert('Great Success!');

	// 		}	
	// 	},

	// 	remove: function() {
	// 		// Remove the validation binding
	// 		// See: http://thedersen.com/projects/backbone-validation/#using-form-model-validation/unbinding
	// 		Backbone.Validation.unbind(this);
	// 		return Backbone.View.prototype.remove.apply(this, arguments);
	// 	},

	// 	hideForm: function(e){
	// 		e.preventDefault();
	// 		this.$el.fadeOut(400);
	// 		window.history.back()
	// 	},

	// 	render: function(){
	// 		this.$el.html(this.template).fadeIn(200);
	// 		this.stickit();
	// 		return this;
	// 	}
	// });


	App.Router = Backbone.Router.extend({

		routes: {
			'' : 'index',
			'about' : 'showAbout',
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

