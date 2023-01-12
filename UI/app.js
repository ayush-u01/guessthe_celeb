// Dropzone.autoDiscover = false;

// // this dropzone has been included external - implemented in dropzone.min.js in seperate files
// // it hs functionality to take image - convert to base 64, give to model - return resukt array of imfo 
// function init() {
//     // initialise dropzone control with default params
//     let dz = new Dropzone("#dropzone", {
//         url: "/",
//         maxFiles: 1,
//         addRemoveLinks: true,
//         dictDefaultMessage: "Some Message",
//         autoProcessQueue: false
//     });
    
//     dz.on("addedfile", function() { // fxn run when u add the file - drag n drop
//         if (dz.files[1]!=null) {
//             dz.removeFile(dz.files[0]);        
//         }
//     });

//     dz.on("complete", function (file) { // after converting image to base 64 command comes over here - now we have to give that b64 dtata to server and take json outp gen from there
//         let imageData = file.dataURL;
//         var url = "http://127.0.0.1:5000/classify_image" // classify_image is http endpoint
//         // restful - post call 
//         $.post(url, { // you need to give b64 img_data to server
//             image_data: imageData

//         }, function(data, status){
//             console.log(data)
//             // you can see ow data returned by flask server is formatted below now we need to extract out some imp data from it and show in our way/ 
//             if(!data || data.length == 0){
//                 $("#error").show();
//                 $("#resultHolder").hide();
//                 $("#divClassTable").hide();
//             }
//             // so our data is array of elem based on Node. of person there are in img - can see eg below if img has 2 person data array has size 2
//             // choose the person who match the most by taking max, store info of that person in match , and prob as maxscore
//             let match = null;
//             let bestscore= -1;
//             for(let i=0; i<data.length; i++){
//                 let maxScoreForThisClass = Math.max(...data[i].class_probability);
//                 // let maxScoreForThisClass = Math.max(...data[i].class_probability);
//                 if(maxScoreForThisClass > bestscore){
//                     match = data[i];
//                     bestscore = maxScoreForThisClass;
//                 }
//             }
//             if(match){
//                 $("#error").hide();
//                 $("#resultHolder").show();
//                 // our  resultholder can show name and logo_img of palyer 
//                 $("#divClassTable").show();
//                 // out divClassTable is shoeing player - vs - prob score in table - prob - score with each person is also returned by server
//                 // initially table is blank 
//                 // result holder is designed for each player so you have to give correct class name by taking out player stored in class param of match
//                 $("#resultHolder").html($(`[data-player="${match.class}"`).html());
                
//                 let classDictionary = match.class_dictionary;
//                 for(let personName in classDictionary ){
//                     let id = classDictionary[personName];
//                     let proabilityScore = match.class_probability[id];
//                     let elem_name = "#score_" + personName;
//                     $(elem_name).html(proabilityScore);
//                 }
//             }

//         })

//     });

//     $("#submitBtn").on('click', function (e) { // fxn called when u submit
//         dz.processQueue();		
//     });
// }

// // this fxn is called when html file is rendered by ur browser
// $(document).ready(function() {
//     console.log( "ready!" );
//     // in the initial stage you want to hide the error and also want to hide the result holder and divtable
//     $("#error").hide();
//     $("#resultHolder").hide();
//     $("#divClassTable").hide();

//     // call init fxn
//     init();
// });



// dz.on("complete", function (file) {
//     let imageData = file.dataURL;
    
//     var url = "http://127.0.0.1:5000/classify_image";

//     $.post(url, {
//         image_data: file.dataURL
//     },function(data, status) {

//        

   /* 
//             Below is a sample response if you have two faces in an image lets say virat and roger together.
//             Most of the time if there is one person in the image you will get only one element in below array
//             data = [
//                 {
//                     class: "viral_kohli",
//                     class_probability: [1.05, 12.67, 22.00, 4.5, 91.56],
//                     class_dictionary: {
//                         lionel_messi: 0,
//                         maria_sharapova: 1,
//                         roger_federer: 2,
//                         serena_williams: 3,
//                         virat_kohli: 4
//                     }
//                 },
//                 {
//                     class: "roder_federer",
//                     class_probability: [7.02, 23.7, 52.00, 6.1, 1.62],
//                     class_dictionary: {
//                         lionel_messi: 0,
//                         maria_sharapova: 1,
//                         roger_federer: 2,
//                         serena_williams: 3,
//                         virat_kohli: 4
//                     }
//                 }
//             ]
//             */


//         console.log(data);
//         if (!data || data.length==0) {
//             $("#resultHolder").hide();
//             $("#divClassTable").hide();                
//             $("#error").show();
//             return;
//         }
//         let players = ["lionel_messi", "maria_sharapova", "roger_federer", "serena_williams", "virat_kohli"];
        
//         let match = null;
//         let bestScore = -1;
//         for (let i=0;i<data.length;++i) {
//             let maxScoreForThisClass = Math.max(...data[i].class_probability);
//             if(maxScoreForThisClass>bestScore) {
//                 match = data[i];
//                 bestScore = maxScoreForThisClass;
//             }
//         }
//         if (match) {
//             $("#error").hide();
//             $("#resultHolder").show();
//             $("#divClassTable").show();
//             $("#resultHolder").html($(`[data-player="${match.class}"`).html());
//             let classDictionary = match.class_dictionary;
//             for(let personName in classDictionary) {
//                 let index = classDictionary[personName];
//                 let proabilityScore = match.class_probability[index];
//                 let elementName = "#score_" + personName;
//                 $(elementName).html(proabilityScore);
//             }
//         }
//         // dz.removeFile(file);            
//     });
// });


          

Dropzone.autoDiscover = false;

function init() {
    let dz = new Dropzone("#dropzone", {
        url: "/",
        maxFiles: 1,
        addRemoveLinks: true,
        dictDefaultMessage: "Some Message",
        autoProcessQueue: false
    });
    
    dz.on("addedfile", function() {
        if (dz.files[1]!=null) {
            dz.removeFile(dz.files[0]);        
        }
    });

    dz.on("complete", function (file) {
        let imageData = file.dataURL;
        
        var url = "http://127.0.0.1:5000/classify_image";

        $.post(url, {
            image_data: file.dataURL
        },function(data, status) {
            /* 
            Below is a sample response if you have two faces in an image lets say virat and roger together.
            Most of the time if there is one person in the image you will get only one element in below array
            data = [
                {
                    class: "viral_kohli",
                    class_probability: [1.05, 12.67, 22.00, 4.5, 91.56],
                    class_dictionary: {
                        lionel_messi: 0,
                        maria_sharapova: 1,
                        roger_federer: 2,
                        serena_williams: 3,
                        virat_kohli: 4
                    }
                },
                {
                    class: "roder_federer",
                    class_probability: [7.02, 23.7, 52.00, 6.1, 1.62],
                    class_dictionary: {
                        lionel_messi: 0,
                        maria_sharapova: 1,
                        roger_federer: 2,
                        serena_williams: 3,
                        virat_kohli: 4
                    }
                }
            ]
            */
            console.log(data);
            if (!data || data.length==0) {
                $("#resultHolder").hide();
                $("#divClassTable").hide();                
                $("#error").show();
                return;
            }
            let players = ["lionel_messi", "maria_sharapova", "roger_federer", "serena_williams", "virat_kohli"];
            
            let match = null;
            let bestScore = -1;
            // let pname = null;
            for (let i=0;i<data.length;++i) {
                let maxScoreForThisClass = Math.max(...data[i].class_probability);
                if(maxScoreForThisClass>bestScore) {
                    match = data[i];
                    bestScore = maxScoreForThisClass;
                }
            }
            if (match) {
                $("#error").hide();
                $("#resultHolder").show();
                $("#divClassTable").show();
                let pname = null;
                let pmax = -1;
                let classDictionary = match.class_dictionary;
                for(let personName in classDictionary) {
                    let index = classDictionary[personName];
                    let proabilityScore = match.class_probability[index];
                    if(pmax < proabilityScore) {
                        pmax = proabilityScore;
                        pname = players[index];
                    }
                    let elementName = "#score_" + personName;
                    $(elementName).html(proabilityScore);
                }
                $("#resultHolder").html($(`[data-player="${pname}"`).html());
            }
            // dz.removeFile(file);            
        });
    });

    $("#submitBtn").on('click', function (e) {
        dz.processQueue();		
    });
}

$(document).ready(function() {
    console.log( "ready!" );
    $("#error").hide();
    $("#resultHolder").hide();
    $("#divClassTable").hide();

    init();
});