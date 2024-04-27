```javascript
// This file/module is responsible for registering and managing a service worker for a web application.
// It provides functionality to register a service worker in production, check for a valid service worker,
// and unregister a service worker. It also includes logic to handle different environments such as localhost
// and production, and to provide updates when new content is available.

const isLocalhost = Boolean( // Determines if the app is running on localhost
  window.location.hostname === 'localhost' || // Checks if hostname is 'localhost'
    window.location.hostname === '[::1]' || // Checks if hostname is the IPv6 localhost address
    window.location.hostname.match( // Checks if hostname is a localhost IPv4 address
      /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
    )
);

export function register(config) { // Exports the register function to allow service worker registration
  if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) { // Checks if in production and serviceWorker is supported
    const publicUrl = new URL(process.env.PUBLIC_URL, window.location.href); // Creates a URL object for the PUBLIC_URL
    if (publicUrl.origin !== window.location.origin) { // Checks if PUBLIC_URL is from the same origin
      return; // Exits the function if origins are different
    }

    window.addEventListener('load', () => { // Adds an event listener for the 'load' event
      const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`; // Constructs the service worker URL

      if (isLocalhost) { // Checks if running on localhost
        checkValidServiceWorker(swUrl, config); // Checks for a valid service worker

        navigator.serviceWorker.ready.then(() => { // Waits for the service worker to be ready
          console.log( // Logs message to console
            'This web app is being served cache-first by a service ' +
              'worker. To learn more, visit https://bit.ly/CRA-PWA'
          );
        });
      } else {
        registerValidSW(swUrl, config); // Registers a valid service worker if not on localhost
      }
    });
  }
}

function registerValidSW(swUrl, config) { // Function to register a valid service worker
  navigator.serviceWorker
    .register(swUrl) // Registers the service worker
    .then(registration => { // Handles successful registration
      registration.onupdatefound = () => { // Sets up an event listener for updates to the service worker
        const installingWorker = registration.installing; // References the installing service worker
        if (installingWorker == null) { // Checks if there's an installing worker
          return; // Exits if there is no installing worker
        }
        installingWorker.onstatechange = () => { // Sets up an event listener for state changes
          if (installingWorker.state === 'installed') { // Checks if the service worker is installed
            if (navigator.serviceWorker.controller) { // Checks if there's an active service worker controlling the page
              console.log( // Logs message to console
                'New content is available and will be used when all ' +
                  'tabs for this page are closed. See https://bit.ly/CRA-PWA.'
              );

              if (config && config.onUpdate) { // Checks if there's a callback for onUpdate
                config.onUpdate(registration); // Calls the onUpdate callback
              }
            } else {
              console.log('Content is cached for offline use.'); // Logs message to console

              if (config && config.onSuccess) { // Checks if there's a callback for onSuccess
                config.onSuccess(registration); // Calls the onSuccess callback
              }
            }
          }
        };
      };
    })
    .catch(error => { // Handles registration errors
      console.error('Error during service worker registration:', error); // Logs error to console
    });
}

function checkValidServiceWorker(swUrl, config) { // Function to check for a valid service worker
  fetch(swUrl) // Fetches the service worker script
    .then(response => { // Handles successful fetch
      const contentType = response.headers.get('content-type'); // Gets the content type of the response
      if (
        response.status === 404 || // Checks if the service worker was not found
        (contentType != null && contentType.indexOf('javascript') === -1) // Checks if the content type is not JavaScript
      ) {
        navigator.serviceWorker.ready.then(registration => { // Waits for the service worker to be ready
          registration.unregister().then(() => { // Unregisters the service worker
            window.location.reload(); // Reloads the page
          });
        });
      } else {
        registerValidSW(swUrl, config); // Registers a valid service worker
      }
    })
    .catch(() => { // Handles fetch errors
      console.log( // Logs message to console
        'No internet connection found. App is running in offline mode.'
      );
    });
}

export function unregister() { // Exports the unregister function to allow service worker unregistration
  if ('serviceWorker' in navigator) { // Checks if serviceWorker is supported
    navigator.serviceWorker.ready.then(registration => { // Waits for the service worker to be ready
      registration.unregister(); // Unregisters the service worker
    });
  }
}