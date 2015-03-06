// To keep our code clean and modular, all custom functionality will be contained inside a single object literal called "buttonFilter".

var buttonFilter = {
  
  // Declare any variables we will need as properties of the object
  
  $filters: null,
  $reset: null,
  groups: [],
  outputArray: [],
  outputString: '',
  
  // The "init" method will run on document ready and cache any jQuery objects we will need.
  
  init: function(){
    var self = this; // As a best practice, in each method we will asign "this" to the variable "self" so that it remains scope-agnostic. We will use it to refer to the parent "buttonFilter" object so that we can share methods and properties between all parts of the object.
    
    self.$filters = $('#Filters');
    self.$reset = $('#Reset');
    self.$container = $('#Container');
    
    self.$filters.find('fieldset').each(function(){
      self.groups.push({
        $buttons: $(this).find('.filter'),
        active: ''
      });
    });
    
    self.bindHandlers();
  },
  
  // The "bindHandlers" method will listen for whenever a button is clicked. 
  
  bindHandlers: function(){
    var self = this;
    
    // Handle filter clicks
    
    self.$filters.on('click', '.filter', function(e){
      e.preventDefault();
      
      var $button = $(this);
      
      // If the button is active, remove the active class, else make active and deactivate others.
      
      $button.hasClass('active') ?
        $button.removeClass('active') :
        $button.addClass('active').siblings('.filter').removeClass('active');
      
      self.parseFilters();
    });
    
    // Handle reset click
    
    self.$reset.on('click', function(e){
      e.preventDefault();
      
      self.$filters.find('.filter').removeClass('active');
      self.$filters.find('.show-all').addClass('active');
      
      self.parseFilters();
    });
  },
  
  // The parseFilters method checks which filters are active in each group:
  
  parseFilters: function(){
    var self = this;
 
    // loop through each filter group and grap the active filter from each one.
    
    for(var i = 0, group; group = self.groups[i]; i++){
      group.active = group.$buttons.filter('.active').attr('data-filter') || '';
    }
    
    self.concatenate();
  },
  
  // The "concatenate" method will crawl through each group, concatenating filters as desired:
  
  concatenate: function(){
    var self = this;
    
    self.outputString = ''; // Reset output string
    
    for(var i = 0, group; group = self.groups[i]; i++){
      self.outputString += group.active;
    }
    
    // If the output string is empty, show all rather than none:
    
    !self.outputString.length && (self.outputString = 'all'); 
    
    console.log(self.outputString); 
    
    // ^ we can check the console here to take a look at the filter string that is produced
    
    // Send the output string to MixItUp via the 'filter' method:
    
	  if(self.$container.mixItUp('isLoaded')){
    	self.$container.mixItUp('filter', self.outputString);
	  }
  }
};
  
// On document ready, initialise our code.

$(function(){
      
  // Initialize buttonFilter code
      
  buttonFilter.init();
      
  // Instantiate MixItUp
      
  $('#Container').mixItUp({
    controls: {
      enable: false // we won't be needing these
    },
    callbacks: {
      onMixFail: function(){
        alert('No items were found matching the selected filters.');
      }
    }
  });    
});



// Declare modal object

var mixModal = {
  $bg: null,
  $content: null,
  init: function(){
    
    // Instantiate MixItUp on background wrapper
    
    this.$bg.mixItUp({
      controls: {
        enable: false
      },
      load: {
        filter: 'none'
      },
      animation: {
        effects: 'fade',
        duration: 400,
      }
    });
    
    // Instantiate MixItUp on content wrapper

    this.$content.mixItUp({
      controls: {
        enable: false
      },
      
	animation: {
		duration: 700,
		effects: 'fade translateZ(-360px) scale(0.25) translateY(10%) stagger(34ms)',
		easing: 'cubic-bezier(0.47, 0, 0.745, 0.715)'
	}
      load: {
        filter: 'none'
      }
    });
  },
  
  // Create a "show" method
  
  show: function(){
    this.$bg.show().mixItUp('filter', 'all');
    this.$content.show().mixItUp('filter','all'); 
  },
  
  // Create a "hide" method
  
  hide: function(){
    this.$bg.mixItUp('filter', 'none', function(){
      $(this).hide();
    });
    this.$content.mixItUp('filter','none', function(){
      $(this).hide();
    });
  }
};

// On document ready:
  
$(function(){
  
  // Assign elements to modal properties
  
  mixModal.$bg = $('#ModalBgWrap');
  mixModal.$content = $('#ModalContentWrap');
  
  // Initialize modal
  
  mixModal.init();
  
  // Bind click handlers
  
  $('.modal-trigger').on('click', function(){
    mixModal.show();
  });
  
  $('.modal-close, .modal-wrap').on('click', function(e){
    if(e.target === this){
      mixModal.hide();
    }
  });
  
 });











