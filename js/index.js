(function ($) {

  console.clear()
  console.log('svgColor')

  var mainHolder, colorHolder
  var btnRandom, btnClear, btnDownloadSVG, btnDownloadPNG
  var svgObject, svgOutline, svgColor
  var swatchUp, swatchDown
  var fillSpeed = 2
  var chosenColor = '#FFFFFF'
  var colors = ['#FFFFFF', '#8E53A1', '#6ABD46', '#71CCDC', '#F7ED45', '#F7DAAF', '#EC2527', '#F16824', '#CECCCC', '#5A499E', '#06753D', '#024259', '#FDD209', '#7D4829', '#931B1E', '#B44426', '#979797', '#C296C5', '#54B948', '#3C75BB', '#F7ED45', '#E89D5E', '#F26F68', '#F37123', '#676868', '#9060A8', '#169E49', '#3CBEB7', '#FFCD37', '#E5B07D', '#EF3C46', '#FDBE17', '#4E4D4E', '#6B449B', '#BACD3F', '#1890CA', '#FCD55A', '#D8C077', '#A62E32', '#F16A2D', '#343433', '#583E98', '#BA539F', '#9D2482', '#DD64A5', '#DB778D', '#EC4394', '#E0398C', '#68AF46', '#4455A4', '#FBEE34', '#AD732A', '#D91E36', '#F99B2A']
  var pastels = ["#F70000",
    "#B9264F",
    "#990099",
    "#74138C",
    "#0000CE",
    "#1F88A7",
    "#4A9586",
    "#FF2626",
    "#D73E68",
    "#B300B3",
    "#8D18AB",
    "#5B5BFF",
    "#25A0C5",
    "#5EAE9E",
    "#FF5353", "#DD597D", "#CA00CA",
    "#A41CC6",
    "#7373FF",
    "#29AFD6", "#74BAAC",
    "#FF7373", "#E37795", "#D900D9", "#BA21E0", "#8282FF", "#4FBDDD", "#8DC7BB",
    "#FF8E8E", "#E994AB", "#FF2DFF", "#CB59E8", "#9191FF", "#67C7E2", "#A5D3CA",
    "#FFA4A4", "#EDA9BC", "#F206FF", "#CB59E8", "#A8A8FF", "#8ED6EA", "#C0E0DA",
    "#FFB5B5", "#F0B9C8", "#FF7DFF", "#D881ED", "#B7B7FF", "#A6DEEE", "#CFE7E2",
    "#FFC8C8", "#F4CAD6", "#FFA8FF", "#EFCDF8", "#C6C6FF", "#C0E7F3", "#DCEDEA",
    "#FFEAEA", "#F8DAE2", "#FFC4FF", "#EFCDF8", "#DBDBFF", "#D8F0F8", "#E7F3F1"
  ]
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
      var randomNum = Math.floor((Math.random() * pastels.length) + 1);
      TweenMax.to(this, fillSpeed, {
        fill: pastels[randomNum]
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

    $.each(pastels, function () {
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