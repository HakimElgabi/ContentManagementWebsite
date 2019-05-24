var webdriver = require('selenium-webdriver'),
  By = webdriver.By,
  until = webdriver.until;

var driver = new webdriver.Builder()
  .forBrowser('chrome')
  .build();

//////////////////////////////////////////// LOGIN TEST ///////////////////////////////////////////////////
//get the url
driver.get('http://localhost:3000/TMS/signin');

//find dom elements and populate with hardcoded data
driver.sleep(1000).then(function () {
  var firstname = driver.findElement(By.id('username'));
  firstname.sendKeys('Hakim');
  var pass = driver.findElement(By.id('password'));
  pass.sendKeys('Hello123');
});

//find button and then submit 
driver.sleep(5000).then(function () {
  driver.findElement(By.id('submit')).click();
});

//if session created is reached test has been successfully passed!
driver.sleep(5000).then(function () {
  driver.getSession().then(function (session) {
    if (session != null) {
      console.log('Test passed successfully - user session created');
    } else {
      console.log('Test failed');
      // driver.quit();
    }
  });
});

driver.sleep(10000).then(function () {
  driver.findElement(By.linkText("Current Graphics Projects")).click();
});

driver.sleep(15000).then(function () {
  driver.findElement(By.linkText("New Project")).click();
});

////////////////////////////////// UPLOAD TEST //////////////////////////////////

driver.sleep(20000).then(function () {
  driver.getTitle().then(function(title) {
    if(title === 'Create New File') {
      console.log('Test passed - User is able to create new Project');
    } else {
      console.log('Test failed');
    }
  });
  var title = driver.findElement(By.id('file_name'));
  title.sendKeys('Test Project');

  var description = driver.findElement(By.name('tags'));
  description.sendKeys('Test');
});

driver.sleep(25000).then(function () {
  driver.findElement(By.id("submit")).click();
});

driver.sleep(27000).then(function () {
  driver.navigate().refresh();
});

driver.sleep(32000).then(function () {
  driver.findElement(By.id("Test Project")).click();
});

driver.sleep(37000).then(function () {
  driver.findElement(By.id("edit")).click();
});

driver.sleep(42000).then(function () {
  driver.getTitle().then(function(title) {
    if(title === 'Edit Test Project') {
      console.log('Test passed - User is able to Edit Project');
    } else {
      console.log('Test failed');
    }
  });
  var resolution = driver.findElement(By.id('resolution'));
  resolution.sendKeys('1920 x 1080');

  var format = driver.findElement(By.id('file_format'));
  format.sendKeys('PNG');

  var tags = driver.findElement(By.id('tags'));
  tags.sendKeys(' Version 2');

  driver.findElement(By.id("submit")).click();
});

driver.sleep(47000).then(function () {
  driver.findElement(By.linkText("Current Graphics Projects")).click();
});

driver.sleep(50000).then(function () {
  driver.navigate().refresh();
});

driver.sleep(55000).then(function () {
  var search = driver.findElement(By.id('search'));
  search.sendKeys('Test');

  driver.findElement(By.id("submit")).click();
});

driver.sleep(60000).then(function () {
  driver.findElement(By.id("Test Project")).click();
});

driver.sleep(65000).then(function () {
  driver.getTitle().then(function(title) {
    if(title === 'Test Project') {
      console.log('Test passed - Correct File was found');
    } else {
      console.log('Test failed');
    }
  });
  driver.findElement(By.id("delete")).click();
});

driver.sleep(70000).then(function () {
  driver.getTitle().then(function(title) {
    if(title === 'Delete Test Project') {
      console.log('Test passed - User is able to delete Project');
    } else {
      console.log('Test failed');
    }
  });
  driver.findElement(By.id("yes")).click();
});

driver.sleep(75000).then(function () {
  driver.findElement(By.linkText("Sign Out")).click();
});

driver.sleep(80000).then(function () {
  driver.quit();
});