// Fetch all posts from the API
fetch('http://jsonplaceholder.typicode.com/posts')
    .then(response => response.json())
    .then(posts => {

        // 1. List all of the post titles having more than six words

        // Use the filter() method to get post titles with more than six words
        const longTitles = posts
            .filter(post => post.title.split(' ').length > 6)
            .map(post => post.title);  // Extract only the title from the post

        console.log("Post Titles with More than Six Words:", longTitles);

        // 2. Show a word frequency map for all of the body contents of the posts

        // First, use map() to get all post bodies
        // Then, use join() to merge all bodies into a single string
        // Followed by split() to get individual words, and reduce() to create a word frequency map
        const wordFrequency = posts
            .map(post => post.body)  // Extract the body content of each post
            .join(' ')  // Join all post bodies into one large string
            .split(/\W+/)  // Split the string into individual words
            .reduce((acc, word) => {
                // Convert word to lowercase to ensure case-insensitivity
                const lowercasedWord = word.toLowerCase();
                // If the word already exists in the accumulator, increment its count; otherwise, initialize it to 1
                acc[lowercasedWord] = (acc[lowercasedWord] || 0) + 1;
                return acc;
            }, {});  // Start with an empty object as the accumulator

        console.log("Word Frequency Map:", wordFrequency);
    })
    .catch(error => {
        console.error("There was an error fetching the data:", error);
    });

