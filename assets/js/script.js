
//display current date and time in header
const now = dayjs();
setInterval(function () {
  $("#currentDay").text("Current Date and Time: " + dayjs().format("dddd, MMMM D YYYY, h:mm:ss"));
}, 1000);


$(function () {
  // current hour stored in a variable for comparison purposes
  
  function saveTask() {
    //event listener on every save button
    $(".saveBtn").on("click", function () {
      var key = $(this).parent().attr('id'); //time-block id used as key
      var value = $(this).siblings(".description").val(); // textarea entry stored in value
      localStorage.setItem(key, value);
      alert("Task Saved!");
    })
  }

  function updateTimeBlockColor() {
    var currentHour = dayjs().hour();
    //iterate over each time block
    $(".time-block").each(function () {
      var blockHour = parseInt($(this).attr('id').split('-')[1]); //split the id attribute of each timeblock into an array and parse the second child
      //remove any old classes for simplicity
      $(this).removeClass('past present future');
      //compare blockHour to currentHour and add repsective class
      if (blockHour < currentHour) {
        $(this).addClass('past');
      } else if (blockHour === currentHour) {
        $(this).addClass('present');
      } else {
        $(this).addClass('future');
      }
    })
  }

  function loadTask() {
    //iterate over each time block
    $(".time-block").each(function () {
      var key = $(this).attr("id");
      var value = localStorage.getItem(key); // retrieve the stored value
      if (value !== null) { // if value in local storage is not empty
        $(this).children('.description').val(value); // set the va
      }
    })
  }
    saveTask();
    loadTask();
    updateTimeBlockColor();
    setInterval(updateTimeBlockColor, 60000); //every minute, this method is called to keep the colors of the bloacks updated.
  
});
