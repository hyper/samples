import React from 'react';

export default function Index() {
  return (
    <div className="min-vh-100 d-flex align-items-center p-3 bg-light">
      <div className="card rounded-lg p-4 mx-auto border" style={{ maxWidth: '28rem' }}>
        <p>
          To get started, <a href="https://hyper.co/new" target="_blank">create a release</a> in the Hyper dashboard.
          Once you've created a release, copy the password and go to the following page on this site.
        </p>

        <div className="bg-light rounded my-1 px-2 py-1 text-monospace">/purchase?password={'<password>'}</div>
      </div>
    </div>
  );
}
