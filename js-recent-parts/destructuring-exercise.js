/* # Destructuring

Create a function similar to underscore.js `extend`, which uses destructuring and restructuring to make a handleResponse util function, and includes the following defaults.
*/

var defaults = {
  topic: "JavaScript",
  format: "Live",
  slides: {
    start: 0,
    end: 100,
  },
};

fakeAjax("http://get-the-workshop.tld", handleResponse);

// *******************************************************

function handleResponse({
  topic = "JavaScript",
  format = "Live",
  slides,
  slides: {
    start = 0,
    end = 100,
  } = {},
  ...rest
} = {}) {
  TestCase({
    topic: topic,
    format: format,
    slides: {
      start: start,
      end: end,
    ...rest
    }
  });
}

function TestCase(data) {
  console.log(
    data.topic == "JS Recent Parts" &&
      data.format == "Live" &&
      data.slides.start === 0 &&
      data.slides.end == 77
  );
}

// *******************************************************

function fakeAjax(url, cb) {
  // fake ajax response:
  cb({
    topic: "JS Recent Parts",
    slides: {
      end: 77,
    },
  });
}
