// pages/api/webhook.js

import { exec } from 'child_process';

export default async function handler(req, res) {
  // Only accept POST requests
  if (req.method === 'POST') {
    try {
      const event = req.body;
      console.log('Received Webhook Event:', event);

      // Check if the action is post creation/update
      if (event.action === 'post_updated' || event.action === 'post_created') {
        // Trigger the sitemap regeneration process (Yoast should handle it)
        exec('node scripts/generate-sitemap.js', (error, stdout, stderr) => {
          if (error) {
            console.error(`Error triggering sitemap generation: ${error}`);
            return;
          }
          console.log(`stdout: ${stdout}`);
          console.error(`stderr: ${stderr}`);
        });

        // Respond to the webhook
        res.status(200).json({ message: 'Sitemap generation triggered successfully' });
      } else {
        res.status(400).json({ message: 'Unrecognized action' });
      }
    } catch (error) {
      console.error('Error in webhook handler:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
