(function ($) {

  console.clear()
  console.log('svgColor')

  var mainHolder, colorHolder
  var btnRandom, btnClear, btnDownloadSVG, btnDownloadPNG
  var svgObject, svgOutline, svgColor
  var swatchUp, swatchDown
  var fillSpeed = 2
  var chosenColor = '#FFFFFF'
  var colors = ['#55efc4', '#00b894', '#81ecec', '#00cec9', '#74b9ff', '#0984e3', '#a29bfe', '#6c5ce7'
                 '#dfe6e9', '#b2bec3', '#ffeaa7', '#fdcb6e', '#fab1a0', '#e17055' ,'#ff7675', '#d63031', '#fd79a8', '#e84393',
                 '#636e72', '#2d3436', '#FFFFFF']
  var closeOffset

  function swatchClick() {
    chosenColor = $(this).data('color')
    console.log(chosenColor)
    TweenMax.to(colorHolder, fillSpeed, {
      backgroundColor: chosenColor
    })
  }

  function swatchMove(e) {
    var moveTo = (e.type == 'mouseenter') ? swatchUp : swatchDown;
    TweenMax.to('.swatchHolder', 0.5, moveTo);
  }

  function colorMe() {
    TweenMax.to(this, fillSpeed, {
      fill: chosenColor
    });
  }

  function clearColor() {
    var clicked = (e.type == 'mouseenter')
  }

  function colorRollover(e) {
    var rollover = (e.type == 'mouseenter') ? {
      scale: 1.2
    } : {
      scale: 1
    };
    TweenMax.to($(this), 0.05, rollover);
  }

  function svgRandom() {
    $(svgColor).each(function () {
      var randomNum = Math.floor((Math.random() * colors.length) + 1);
      TweenMax.to(this, fillSpeed, {
        fill: colors[randomNum]
      });
    })
  }

  function svgClear() {
    $(svgColor).each(function () {
      TweenMax.to(this, fillSpeed, {
        fill: "#FFF"
      });
    })
  }

  function svgDownloadSVG() {
    var svgInfo = $("<div/>").append($(svgObject).clone()).html();
    $(this).attr({
      href: "data:image/svg+xml;utf8," + svgInfo,
      download: 'coloringBook.svg',
      target: "_blank"
    });
  }

  function svgDownloadPNG() {
    // Future expantion:
    // Look at https://bl.ocks.org/biovisualize/8187844
  }

  $.fn.makeSwatches = function () {
    var swatchHolder = $('<ol/>', {
      'class': 'swatchHolder'
    }).appendTo(this)
    colorHolder = $('<li/>', {
      'class': 'colorHolder',
      'text': 'Current Color'
    }).css('background-color', chosenColor).appendTo(swatchHolder)

    $.each(colors, function () {
      var swatch = $('<li/>').appendTo(swatchHolder)
      $(swatch).css('background-color', this)
      $(swatch).data('color', this)
      $(swatch).on('click', swatchClick)
      $(swatch).on('mouseenter mouseleave', colorRollover)
    })

    var swatchPos = $('.colorHolder').position()
    var swatchHeight = $('.colorHolder').outerHeight(true) + swatchPos.top
    closeOffset = swatchHeight - $('.swatchHolder').outerHeight()

    $('.swatchHolder').on('mouseenter mouseleave', swatchMove)
    $('.swatchHolder').css('bottom', closeOffset)
    swatchUp = {
      css: {
        bottom: 0
      }
    }
    swatchDown = {
      css: {
        bottom: closeOffset
      }
    }
  }
  $.fn.makeSVGcolor = function (svgURL) {
    mainHolder = this
    $(this).load(svgURL, function () {
      svgObject = $('svg', this)
      svgColor = $('g:nth-child(2)', svgObject).children()
      svgOutline = $('g:nth-child(1)', svgObject).children()
      $(svgColor).on('click', colorMe)
      $(mainHolder).makeSwatches()
      $('.swatchHolder').addClass('gray')
    });
  }

  $.fn.btnRandom = function () {
    btnRandom = this
    $(btnRandom).on('click', svgRandom)
  }
  $.fn.btnClear = function () {
    btnClear = this
    $(btnClear).on('click', svgClear)
  }
  $.fn.btnDownload = function (type) {
    if (type == 'PNG') {
      btnDownloadPNG = this
      $(this).on('mouseenter', svgDownloadPNG)
    } else {
      btnDownloadSVG = this
      $(this).on('mouseenter', svgDownloadSVG)
    }
  }
}(jQuery));

$('#ActivityDIV').makeSVGcolor('flor.svg')
$('#btnRandom').btnRandom()
$('#btnClear').btnClear()
$('#btnDownloadSVG').btnDownload()
