# Peng
<img src="assets/peng-logo.svg" alt="logo">
<p>Peng is a javascript library that renders presetations from HTML.</p>

> [!WARNING]
> The project is still under development. Any features could be removed without any announcements.
> <br>
> Use at your own risk!

## Example
```html

<head>
  <script src="peng.umd.cjs"></script>
  <style>
    body {
      font-size: 14pt;
      margin: 4rem 8rem;
      background: black;
      color: white;
    }

    a {
      color: lightblue;
      text-decoration: underline dotted;
    }

    a:hover {
      text-decoration: underline solid;
    }
  </style>
</head>

<body style="overflow: clip">
  <p-present>
    <p-slide>
      <img p-anim="-rotate 360 -start onclick" src="peng/assets/peng-logo.svg" width="64"></img>
      <h1 style="display: inline; margin-left: 0.5rem;">Peng</h1>
      <hr>
      <p>
        Welcome to <a p-anim="-inline-block -rotate 360" p-intr href="https://github.com/tinntran/peng" target="_blank">Peng</a>
      </p>
      <p>
        The successor to <a p-anim="-inline-block -rotate 360" p-intr href="https://github.com/tinntran/penguist" target="_blank">Penguist</a>
      </p>
    </p-slide>
    <p-slide>
      <p p-anim="-rotate 360 -start onclick">– To create free presentations. <s p-intr>Fuck Microsoft Powerpoint Fuck Canva</s></p>
      <p p-anim="-rotate 360">– Offers a programmatical design experience.</p>
      <p p-anim="-rotate 360 -start onclick">– I want to try something new.</p>
    </p-slide>
  </p-present>

  <script>
    Peng.init()
  </script>
</body>
```
