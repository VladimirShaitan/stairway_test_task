var MyApp = angular.module('MyApp', ['ngMaterial'])
    .config(function($mdThemingProvider) {
      $mdThemingProvider.theme('default')
          .primaryPalette('pink')
          .accentPalette('orange');
    });


var slides = [
    {
        content: 'Lorem Ipsum is simply dummy text of the printing and typesetting',
        impression: 0
    },
    {
        content: 'Lorem Ipsum has been the industry\'s standard dummy text ever',
        impression: 0
    },
    {
        content: 'since the 1500s, when an unknown printer took a galley of type and ',
        impression: 0
    },
    {
        content: 'scrambled it to make a type specimen book. It has survived not',
        impression: 0
    },
    {
        content: 'only five centuries, but also the leap into electronic typesetting,',
        impression: 0
    },
    {
        content: 'remaining essentially unchanged. It was popularised in the 1960s',
        impression: 0
    },
    {
        content: 'with the release of Letraset sheets containing Lorem Ipsum',
        impression: 0
    },

];


angular.module('MyApp').
    component('sliderSlides', {
        template:
            '<section class="slider-section" ng-mouseover="$ctrl.stopSliderAutoplay()" ng-mouseleave="$ctrl.startSliderAutoplay()">'+
            '<div class="slider-wrapper"  >' +
            '<div class="slider">' +
            '<div class="item " ng-repeat="(currentSlideIndex, slide) in $ctrl.slides"">' +
            '<div class="slideText">{{slide.content}}</div>' +
            '</div>' +
             '</div>' +
            '</div >'+
            '<md-button  type="submit" class="md-fab prev" ng-click="$ctrl.minusSlide()">&#10094;</md-button>' +
            '<md-button  type="submit" class="md-fab next" ng-click="$ctrl.plusSlide()">&#10095;</md-button>'+
            '</section>',
        controller: function SliderController($timeout, $interval, $window) {
            var self = this;
            self.slides = slides;
            self.slideWidth = 300;
            self.slideIndent = 10;
            self.defaultVisibleSlidesCount = self.visibleSlidesCount = 3;
            self.sliderTransition = 300;
            self.sliderPosition = 0;
            self.sliderAutoplay = true;
            self.sliderAutoplayDelay = 1500;
            self.sliderStopOnHover = true;
            self.slidesHolder =  document.querySelector('.slider');
            self.sliderInterval;

            self.plusSlide = function() {
                self.calcSlidesOnResize();
                let sliderItems = document.querySelectorAll('.slider .item');
                let oldPosition = self.sliderPosition;

                self.sliderPosition -= self.slideWidth * self.visibleSlidesCount;
                self.sliderPosition = Math.max(self.sliderPosition, -self.slideWidth * (sliderItems.length - self.visibleSlidesCount));
                if(self.sliderPosition === oldPosition) {
                    self.sliderPosition = 0;
                }
                self.slidesHolder.style.transform = `translate(${self.sliderPosition}px)`;
                $timeout(self.addImpression, self.sliderTransition);
            };

            self.minusSlide = function () {
                let oldPosition = self.sliderPosition;
                let sliderItems = document.querySelectorAll('.slider .item');
                self.calcSlidesOnResize();
                self.sliderPosition += self.slideWidth * self.visibleSlidesCount;
                self.sliderPosition = Math.min(self.sliderPosition, 0);
                if(oldPosition === 0) {
                    self.sliderPosition = -self.slideWidth * (sliderItems.length - self.visibleSlidesCount)
                }
                self.slidesHolder.style.transform = `translate(${self.sliderPosition}px)`;
                $timeout(self.addImpression, self.sliderTransition);
            };

            self.addImpression = function () {
                self.sliderCoordinates = document.querySelector('.slider-wrapper').getBoundingClientRect();
                let sliderItems = document.querySelectorAll('.slider .item');
                for (let i = 0; i <= sliderItems.length -1; i++) {
                    let singleSlideCoordinates = sliderItems[i].getBoundingClientRect().x + self.slideIndent;
                    if(singleSlideCoordinates >= self.sliderCoordinates.x && singleSlideCoordinates < (self.sliderCoordinates.x + self.sliderCoordinates.width) ) {
                        slides[i].impression++;
                    }
                }
            };

            self.calcSlidesOnResize = function () {
                if($window.screen.availWidth >= 992) {
                    self.visibleSlidesCount = self.defaultVisibleSlidesCount;
                } else if($window.screen.availWidth >= 767) {
                    self.visibleSlidesCount = 2;
                } else {
                    self.visibleSlidesCount = 1;
                }
            };


            self.stopSliderAutoplay = function () {
                if (self.sliderInterval && self.sliderStopOnHover) {
                    $interval.cancel(self.sliderInterval);
                }
            };

            self.startSliderAutoplay = function() {
                if(self.sliderAutoplay) {
                    self.sliderInterval = $interval(self.plusSlide, self.sliderAutoplayDelay);
                }
            };

            $timeout(self.addImpression, self.sliderTransition);
            self.startSliderAutoplay();

        },
    });



MyApp.controller('tableController', function ($scope, $mdDialog) {
    $scope.slides = slides;
    $scope.showAlert = function(ev, slideIndex) {
        $mdDialog.show(
            $mdDialog.alert()
                .parent(angular.element(document.querySelector('#popupContainer')))
                .clickOutsideToClose(true)
                .title(`Slide #${slideIndex+1} | Array index: ${slideIndex}`)
                .textContent(`${slides[slideIndex].content}`)
                .ariaLabel('Alert Dialog Demo')
                .ok('Got it!')
                .targetEvent(ev)
        );
    };


});

MyApp.controller('formController', function ($scope) {
    $scope.addNewSlide = function () {
        if ($scope.content) {
            slides.push({content: $scope.content, impression: 0});
            $scope.content = '';
        }
    }
});

