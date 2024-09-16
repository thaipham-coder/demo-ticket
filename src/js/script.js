function onClickBtnPickImg() {
    var inputBtn = document.getElementById("id_file_up");
    inputBtn.click();
}

function onClickBtnInputFile() {
    this.value = null;
}

function onNameChange() {
    updateCeritifcate();
}

function updateCeritifcate() {
    var canvas = document.getElementById("id_main_canvas");
    var ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";

    var sliderXVal = document.getElementById("id_width_pos").value / 100;
    var sliderYVal = (100 - document.getElementById("id_height_pos").value) / 100;
    var sliderZoomVal = document.getElementById("id_zoom").value;
    var expectedWidth = document.getElementById("id_expect_width").value;

    sliderZoomVal = sliderZoomVal / 20 + 0.8;

    // if (sliderZoomVal > 50)
    //     sliderZoomVal = (sliderZoomVal - 50) / 50;
    // else
    //     sliderZoomVal = sliderZoomVal / 50;

    imgAvatar = document.getElementById("id_img_avatar");
    imgBackground = document.getElementById("id_img_background");

    var xPos = canvas.width * sliderXVal, yPos = canvas.height * sliderYVal;
    var scaleFactor = (sliderZoomVal) * ((expectedWidth / 100) * canvas.width) / imgAvatar.width;
    var dispWidth = imgAvatar.width * scaleFactor;
    var dispHeight = imgAvatar.height * scaleFactor;

    if (imgAvatar.complete)
        ctx.drawImage(imgAvatar, xPos - dispWidth / 2, yPos - dispHeight / 2, dispWidth, dispHeight); // Or at whatever offset you like

    if (imgBackground.complete)
        ctx.drawImage(imgBackground, 0, 0, canvas.width, canvas.height); // Or at whatever offset you like

    var xPos = 1470, yPos = 1445;
    ctx.textAlign = "center";
    ctx.fillStyle = "#fff";
    ctx.shadowColor = "#000";
    // ctx.shadowOffsetX = 3;
    // ctx.shadowOffsetY = 3;
    // ctx.shadowBlur = blur";
    ctx.fontVariantCaps = "all-petite-caps";
    ctx.font = "55px UTM-SWISS-721-BLACK-CONDENSED";
    ctx.fillText(document.getElementById("id_input_name").value, xPos, yPos);
}

function onDownloadClick() {
    var canvas = document.getElementById("id_main_canvas");
    var image = canvas.toDataURL();

    // create temporary link  
    var tmpLink = document.createElement('a');
    tmpLink.download = 'certificate.png'; // set the name of the download file 
    tmpLink.href = image;

    // temporarily add link to body and initiate the download  
    document.body.appendChild(tmpLink);
    tmpLink.click();
    document.body.removeChild(tmpLink);
}

function onInputFileChange() {
    input = document.getElementById("id_file_up");
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            document.getElementById("id_img_avatar").src = e.target.result;
        };

        reader.readAsDataURL(input.files[0]);
    }
}

function onPageLoad() {
    document.getElementById("id_width_pos").value = "78"; // percent
    document.getElementById("id_height_pos").value = "50"; // percent
    document.getElementById("id_zoom").value = "18"; // 2.2x
    document.getElementById("id_expect_width").value = "20"; // percent
    updateCeritifcate();
}