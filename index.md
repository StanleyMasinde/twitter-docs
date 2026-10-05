---
layout: home
title: Twitter CLI
---

<div class="home-shell">
  <section class="home-hero">
    <div>
      <span class="home-eyebrow">Twitter CLI · terminal first</span>
      <h1>Tweet without going to <span>twitter.com.</span></h1>
      <p class="home-lede">Write a tweet, compose a thread, or schedule a tweet from your terminal. Stay with the work you came to do.</p>
      <div class="home-actions">
        <a class="home-primary" href="/guide/get-started">Get started <span aria-hidden="true">&nbsp;→</span></a>
        <a class="home-secondary" href="https://github.com/StanleyMasinde/twitter">View on GitHub ↗</a>
      </div>
    </div>
    <figure class="terminal-proof">
      <figcaption>Three ways to tweet</figcaption>
      <pre><span class="prompt">$</span> twitter tweet --body "Shipping today"
<span class="output">Tweet Id: …</span>
<span class="prompt">$</span> echo "A thought worth sharing" | twitter tweet
<span class="output">Tweet Id: …</span>
<span class="prompt">$</span> twitter tweet --editor
<span class="output">Opens your editor for a tweet or thread</span></pre>
    </figure>
  </section>

  <hr class="home-divider">

  <section class="home-section" aria-labelledby="workflows-title">
    <h2 id="workflows-title">Pick up where your writing starts.</h2>
    <div class="command-rows">
      <a class="command-row" href="/guide/tweet"><strong>Tweet from the terminal</strong><code>twitter tweet --body</code><span>Send text, pipe a draft, or attach an image.</span></a>
      <a class="command-row" href="/guide/tweet#write-a-thread"><strong>Write a thread</strong><code>twitter tweet --editor</code><span>Separate tweets with three dashes in your editor or a file.</span></a>
      <a class="command-row" href="/guide/schedule"><strong>Schedule a tweet</strong><code>twitter schedule new</code><span>Save a draft for later and run due tweets with your OS scheduler.</span></a>
      <a class="command-row" href="/guide/read"><strong>Explore tweets</strong><code>twitter tweets recent</code><span>Search recent tweets and look up tweets by ID.</span></a>
      <a class="command-row" href="/guide/account"><strong>Manage your account</strong><code>twitter me</code><span>Use lists, bookmarks, likes, and other account commands.</span></a>
      <a class="command-row" href="/guide/configuration"><strong>Set up credentials</strong><code>twitter config --init</code><span>Connect your developer app and validate the configuration.</span></a>
    </div>
    <p class="home-examples-link"><a href="/guide/examples">Explore Unix examples →</a></p>
  </section>

  <hr class="home-divider">

  <section class="home-next">
    <div><h2>Ready to start?</h2><p>Install the CLI, add your Twitter developer credentials, and tweet for the first time.</p></div>
    <a class="home-primary" href="/guide/get-started">Read the quickstart →</a>
  </section>
</div>
