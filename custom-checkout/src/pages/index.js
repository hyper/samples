import React from 'react';

export default function Index() {
  return (
    <div className="min-vh-100 d-flex align-items-center p-3 bg-light">
      <div className="card rounded-lg mx-auto border" style={{ maxWidth: '28rem' }}>
        <div className="card-header bg-white py-3">
          <h4 className="mb-0">Setup</h4>
        </div>
        <div className="card-body">
        <p>
          Before you begin, make sure you have completed
          the <a href="https://github.com/meta-labs/samples/tree/main/custom-checkout#required-configuration" target="_blank">required
          configuration</a>.
          You must also disable <a href="https://hyper.co/settings/protection" target="_blank">bot
          protection</a> and <a href="https://hyper.co/settings/payments" target="_blank">require login</a> for this example to work.
        </p>
        <p>
          When you're ready, <a href="https://hyper.co/new" target="_blank">create a release</a> in the Hyper dashboard.
          Once you've created a release, copy the password and go to the following page on this site.
        </p>

        <div className="bg-light rounded my-1 p-2 text-monospace">/purchase?password={'<password>'}</div>
        </div>
      </div>
    </div>
  );
}
