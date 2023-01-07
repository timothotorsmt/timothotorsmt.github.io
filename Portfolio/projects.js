// item select
var currentProject = -1;
var currentTab = 0;
function changeTab(tabNumber) {
    $(".SP__footer__options--filled").removeClass("SP__footer__options--filled");
    $(".SP__footer__options").eq(tabNumber).addClass("SP__footer__options--filled");
    currentTab = tabNumber;
    reloadAnim();
    changeProject(-1);
    setPage(tabNumber, 0);
    pageNo = 0;
}

function changeProject(projectNumber) {
    if (currentProject == projectNumber || projectNumber == -1) {
        $(".SP__project--highlight").removeClass("SP__project--highlight");
        $(".project__item__full").hide();
        $(".project__item__preview").show();
        $(".project__item__preview").children("h2").show();
        currentProject = -1;
        return;
    }

    $(".SP__project--highlight").removeClass("SP__project--highlight");
    $(".project__item__full").hide();
    $(".project__item__preview").show();
    $(".project__item__preview").children("h2").hide();

    $(".SP__project__item").eq(projectNumber).addClass("SP__project--highlight");
    $(".SP__project__item").eq(projectNumber).children(".project__item__full").show();
    $(".SP__project__item").eq(projectNumber).children(".project__item__preview").hide();
    
    // show stuff
    currentProject = projectNumber;
}

// reload animations on scroll-alt
function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}
  
async function reloadAnim() {
    $(".SP__project__item").addClass("scroll__elem--alt");
    var panels = $(".SP__project__item"); 
    for (var i = 0; i < panels.length; i++) {
        await delay(750 / panels.length); 
        $(".SP__project__item").eq(i).removeClass("scroll__elem--alt");
    }
}
reloadAnim();

var templateObj = {
    projectName: "Project Name",
    imageURL: "../media/images/placeholder.png",
    subtitle: "project subtitles",
    description: "project description",
    tags: []
}

var schoolProjData = new Array();
var personalProjData = new Array();
var otherProjData = new Array();
var resultData = new Array();

function loadData() {
    $.ajax({
        async: false,
        url:"data/schoolProjects.csv",
        dataType:"text",
        success:function(data)
        {
            var objects_list = data.split(/\r?\n|\r/);
            for(var count = 0; count<objects_list.length; count++)
            {
                var cell_data = objects_list[count].split("~");
                var tempObj = Object.create(templateObj);
                tempObj.tags = [];
                if (cell_data == 0) {
                    continue;
                }
                for(var cell_count=0; cell_count<cell_data.length; cell_count++)
                {
                    switch (cell_count) {
                        case 0:
                            tempObj.projectName = cell_data[cell_count];
                            break;
                        case 1:
                            tempObj.imageURL = cell_data[cell_count];
                            break;
                        case 2:
                            tempObj.subtitle = cell_data[cell_count];
                            break;
                        case 3:
                            tempObj.description = cell_data[cell_count];
                            break;
                        default:
                            tempObj.tags.push(cell_data[cell_count]);
                            break;
                    }
                }

                // split items 
                schoolProjData.push(tempObj);
            }
        }
    });

    $.ajax({
        async: false,
        url:"data/personalProjects.csv",
        dataType:"text",
        success:function(data)
        {
            var objects_list = data.split(/\r?\n|\r/);
            for(var count = 0; count<objects_list.length; count++)
            {
                var cell_data = objects_list[count].split("~");
                var tempObj = Object.create(templateObj);
                tempObj.tags = [];
                if (cell_data == 0) {
                    continue;
                }
                for(var cell_count=0; cell_count<cell_data.length; cell_count++)
                {
                    switch (cell_count) {
                        case 0:
                            tempObj.projectName = cell_data[cell_count];
                            break;
                        case 1:
                            tempObj.imageURL = cell_data[cell_count];
                            break;
                        case 2:
                            tempObj.subtitle = cell_data[cell_count];
                            break;
                        case 3:
                            tempObj.description = cell_data[cell_count];
                            break;
                        default:
                            tempObj.tags.push(cell_data[cell_count]);
                            break;
                    }
                }

                // split items 
                personalProjData.push(tempObj);
            }

        }
    });

    $.ajax({
        async: false,
        url:"data/otherStuff.csv",
        dataType:"text",
        success:function(data)
        {
            var objects_list = data.split(/\r?\n|\r/);
            for(var count = 0; count<objects_list.length; count++)
            {
                var cell_data = objects_list[count].split("~");
                var tempObj = Object.create(templateObj);
                tempObj.tags = [];
                if (cell_data == 0) {
                    continue;
                }
                for(var cell_count=0; cell_count<cell_data.length; cell_count++)
                {
                    switch (cell_count) {
                        case 0:
                            tempObj.projectName = cell_data[cell_count];
                            break;
                        case 1:
                            tempObj.imageURL = cell_data[cell_count];
                            break;
                        case 2:
                            tempObj.subtitle = cell_data[cell_count];
                            break;
                        case 3:
                            tempObj.description = cell_data[cell_count];
                            break;
                        default:
                            tempObj.tags.push(cell_data[cell_count]);
                            break;
                    }
                }

                // split items 
                otherProjData.push(tempObj);
            }

        }
    });
}

var pageNo = 0;
var maxPageNo = 0;
function setPage(id, pageNumber) {
    $(".SP__project__item").hide();
    switch (id) {
        case 0:
            if (schoolProjData.length - (pageNumber * 5) > 0) {
                var counter = 0;
                
                for (var i = (pageNumber * 5); i < schoolProjData.length; i++) {
                    if (counter > 5) {
                        maxPageNo = Math.ceil(schoolProjData.length / 5);
                        return;
                    } else {
                        maxPageNo = 1;
                    }
                    $(".SP__project__item").eq(counter).show();
                    $(".SP__project__image").eq(counter).attr('src', schoolProjData[i].imageURL);
                    $(".project__item__preview").eq(counter).children("h2").text(schoolProjData[i].projectName);

                    $(".project__item__full").eq(counter).children("h2").text(schoolProjData[i].projectName);
                    $(".project__item__full").eq(counter).children(".SP__project__image--full").attr('src', schoolProjData[i].imageURL);
                    $(".project__item__full").eq(counter).children("h4").text(schoolProjData[i].subtitle);
                    $(".project__item__full").eq(counter).children("p").text(schoolProjData[i].description);
                    $(".project__item__full").eq(counter).children(".SP__project__tags").html("");
                    for (var j = 0; j < schoolProjData[i].tags.length; j++) {
                        $(".project__item__full").eq(counter).children(".SP__project__tags").append("<p>" + schoolProjData[i].tags[j]);
                    }
                    counter++;
                }
                maxPageNo = Math.ceil(schoolProjData.length / 5);
                console.log(maxPageNo);
            } 
            break;
        case 1:
            if (personalProjData.length - (pageNumber * 5) > 0) {
                var counter = 0;
                
                for (var i = (pageNumber * 5); i < personalProjData.length; i++) {
                    if (counter > 5) {
                        maxPageNo = Math.ceil(schoolProjData.length / 5);
                        return;
                    } else {
                        maxPageNo = 1;
                    }
                    $(".SP__project__item").eq(counter).show();
                    $(".SP__project__image").eq(counter).attr('src', personalProjData[i].imageURL);
                    $(".project__item__preview").eq(counter).children("h2").text(personalProjData[i].projectName);

                    $(".project__item__full").eq(counter).children("h2").text(personalProjData[i].projectName);
                    $(".project__item__full").eq(counter).children(".SP__project__image--full").attr('src', personalProjData[i].imageURL);
                    $(".project__item__full").eq(counter).children("h4").text(personalProjData[i].subtitle);
                    $(".project__item__full").eq(counter).children("p").text(personalProjData[i].description);
                    $(".project__item__full").eq(counter).children(".SP__project__tags").html("");
                    for (var j = 0; j < personalProjData[i].tags.length; j++) {
                        $(".project__item__full").eq(counter).children(".SP__project__tags").append("<p>" + personalProjData[i].tags[j]);
                    }
                    counter++;
                }
            } 
            break;
        case 2:
            if (otherProjData.length - (pageNumber * 5) > 0) {
                var counter = 0;
                
                for (var i = (pageNumber * 5); i < otherProjData.length; i++) {
                    if (counter > 5) {
                        maxPageNo = Math.ceil(schoolProjData.length / 5);
                        return;
                    } else {
                        maxPageNo = 1;
                    }
                    $(".SP__project__item").eq(counter).show();
                    $(".SP__project__image").eq(counter).attr('src', otherProjData[i].imageURL);
                    $(".project__item__preview").eq(counter).children("h2").text(otherProjData[i].projectName);

                    $(".project__item__full").eq(counter).children("h2").text(otherProjData[i].projectName);
                    $(".project__item__full").eq(counter).children(".SP__project__image--full").attr('src', otherProjData[i].imageURL);
                    $(".project__item__full").eq(counter).children("h4").text(otherProjData[i].subtitle);
                    $(".project__item__full").eq(counter).children("p").text(otherProjData[i].description);
                    $(".project__item__full").eq(counter).children(".SP__project__tags").html("");
                    for (var j = 0; j < otherProjData[i].tags.length; j++) {
                        $(".project__item__full").eq(counter).children(".SP__project__tags").append("<p>" + otherProjData[i].tags[j]);
                    }
                    counter++;
                }
            } 
            break;
        case 3:
            if (resultData.length - (pageNumber * 5) > 0) {
                var counter = 0;
                
                for (var i = (pageNumber * 5); i < resultData.length; i++) {
                    if (counter > 5) {
                        maxPageNo = Math.ceil(resultData.length / 5);
                        return;
                    } else {
                        maxPageNo = 1;
                    }
                    $(".SP__project__item").eq(counter).show();
                    $(".SP__project__image").eq(counter).attr('src', resultData[i].imageURL);
                    $(".project__item__preview").eq(counter).children("h2").text(resultData[i].projectName);

                    $(".project__item__full").eq(counter).children("h2").text(resultData[i].projectName);
                    $(".project__item__full").eq(counter).children(".SP__project__image--full").attr('src', resultData[i].imageURL);
                    $(".project__item__full").eq(counter).children("h4").text(resultData[i].subtitle);
                    $(".project__item__full").eq(counter).children("p").text(resultData[i].description);
                    $(".project__item__full").eq(counter).children(".SP__project__tags").html("");
                    for (var j = 0; j < resultData[i].tags.length; j++) {
                        $(".project__item__full").eq(counter).children(".SP__project__tags").append("<p>" + resultData[i].tags[j]);
                    }
                    counter++;
                }
            } 
            break;
    }
}

loadData();
changeProject(-1);

setPage(0, 0);

$(".footer--prev").click(function () {
    console.log(pageNo - 1 + "/" + maxPageNo);
    if (pageNo != 0) {
        setPage(currentTab, pageNo - 1);
        pageNo--;
        changeProject(-1);
        reloadAnim();
    }
})

$(".footer--next").click(function () {
    console.log(pageNo + 1 + "/" + maxPageNo);
    if (pageNo < maxPageNo - 1) {
        setPage(currentTab, pageNo + 1);
        pageNo++;
        console.log("next");
        changeProject(-1);
        reloadAnim();
    }
})

const f = $(".SP__searchBar__form")[0];

function submitted(event) {
    event.preventDefault();
    //var searchQuery = new RegExp($("input:text").val(), "i"); 
    showSearchResults($("input:text").val());
}


function showSearchResults(query) {
    // clear results
    resultData = [];
    var found = false;

    for(var i=0; i<schoolProjData.length; i++) {
        found = false;

        for(key in schoolProjData[i]) {
            if(schoolProjData[i][key].toString().toLowerCase().includes(query.toLowerCase()) == 1 && !found) {
                resultData.push(schoolProjData[i]);
                console.log("done");
                found = true;
            }
        }
    }

    for(var i=0; i<personalProjData.length; i++) {
        found = false;
        for(key in personalProjData[i]) {
            if(personalProjData[i][key].toString().toLowerCase().includes(query.toLowerCase()) == 1 && !found) {
                resultData.push(personalProjData[i]);
                console.log("done 1");
                found = true;
            }
        }
    }

    for(var i=0; i<otherProjData.length; i++) {
        found = false;

        for(key in otherProjData[i]) {
            if(otherProjData[i][key].toString().toLowerCase().includes(query.toLowerCase()) == 1 && !found) {
                resultData.push(otherProjData[i]);
                console.log("done 2");
                found = true;
            }
        }
    }

    // if a bitch empty, show the no result image (?)

    // display results
    setPage(3, 0);
    pageNo = 0;
    changeProject(-1);
}

f.addEventListener('submit', submitted)
