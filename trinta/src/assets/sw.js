// This is your service worker script (sw.js)

self.addEventListener('message', (event) => {
  // Extract data sent from your Angular app
  const { submissionId, pollingInterval, photoId, fileName } = event.data;

  // Define a function to poll the submission status
  const pollSubmissionStatus = () => {
    fetch(`/submissions/status/${submissionId}`) // Replace with your actual API endpoint
      .then(response => response.json())
      .then(statusResponse => {
        // Send the status back to your Angular app
        self.clients.matchAll().then(clients => {
          clients.forEach(client => {
            client.postMessage({ statusResponse, photoId, fileName });
          });
        });

        // Continue polling if the status is neither approved nor refused
        if (statusResponse.status !== 'approved' && statusResponse.status !== 'refused') {
          setTimeout(pollSubmissionStatus, pollingInterval);
        }
      });
  };

  // Start the polling process
  pollSubmissionStatus();
});
