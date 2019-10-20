<h3 align="center">OSS Contributhon 2019</h3>
<h1 align="center">TimeCat ⏰🐱</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-0.1.0-blue.svg?cacheSeconds=2592000" />
  <a href="https://github.com/iodes/TimeCat#readme" target="_blank">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" />
  </a>
  <a href="https://github.com/iodes/TimeCat/blob/master/LICENSE" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg" />
  </a>
</p>

> App usage collection and statistics solution

TimeCat show you how you spent your time and help you improve productivity. :octocat:

## 💭 Status

This project is still heavily under development, but is in a state where users are encouraged to try it out and keep it installed alongside the stable TimeCat client. It will continue to evolve over the coming months and hopefully bring some new unique features to the table.

We are accepting bug reports (please report with as much detail as possible). Feature requests are welcome as long as you read and understand the contribution guidelines listed below.

## ✨ Requirements

- [Node.js 10.16.3](https://nodejs.org)
- A desktop platform with the [.NET Core SDK 3.0](https://www.microsoft.com/net/learn/get-started) or higher installed.
- When running on Windows 7 or 8.1, **[additional prerequisites](https://docs.microsoft.com/en-us/dotnet/core/windows-prerequisites?tabs=netcore30)** may be required to correctly run .NET Core applications if your operating system is not up-to-date with the latest service packs.
- When working with the codebase, we recommend using an IDE with intellisense and syntax highlighting, such as [Visual Studio 2019+](https://visualstudio.microsoft.com/vs/), [Jetbrains Rider](https://www.jetbrains.com/rider/) or [Visual Studio Code](https://code.visualstudio.com/).

## 🚀 Running TimeCat

### Downloading the source code

Clone the repository:

```shell
git clone https://github.com/iodes/timecat
cd TimeCat
```

To update the source code to the latest commit, run the following command inside the `TimeCat` directory:

```shell
git pull
```

### Building

Build the core:

```shell
cd TimeCat.Core
dotnet restore
dotnet build
```

Build the client:

```shell
cd TimeCat.Client
npm install
npm start
```

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/iodes/TimeCat/issues).

### Contributors

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
<table>
  <tr>
    <td align="center">
      <a href="https://github.com/iodes"
        ><img
          src="https://avatars0.githubusercontent.com/u/1563800?s=400&v=4"
          width="75px;"
          alt="Kevin So"
        /><br /><sub><b>Kevin So</b></sub></a
      ><br /><a
        href="https://github.com/iodes/TimeCat/commits?author=iodes"
        title="Code"
        >💻</a
      >
      <a
        href="https://github.com/iodes/TimeCat/commits?author=iodes"
        title="Documentation"
        >📖</a
      >
      <a href="#maintenance-iodes" title="Maintenance">🚧</a>
    </td>
    <td align="center">
      <a href="https://github.com/SteaI"
        ><img
          src="https://avatars1.githubusercontent.com/u/9690415?s=400&?v=4"
          width="75px;"
          alt="5ちゃ"
        /><br /><sub><b>5ちゃ</b></sub></a
      ><br /><a
        href="https://github.com/iodes/TimeCat/commits?author=SteaI"
        title="Code"
        >💻</a
      ><a
        href="https://github.com/iodes/TimeCat/commits?author=Web-Engine"
        title="Review"
        >👀</a
      >
    </td>
    <td align="center">
      <a href="https://github.com/Plurdis"
        ><img
          src="https://avatars3.githubusercontent.com/u/23194065?s=460&v=4"
          width="75px;"
          alt="Plurdis"
        /><br /><sub><b>Plurdis</b></sub></a
      ><br /><a
        href="https://github.com/iodes/TimeCat/commits?author=Plurdis"
        title="Code"
        >💻</a
      >
    </td>
    <td align="center">
      <a href="https://github.com/Web-Engine"
        ><img
          src="https://avatars1.githubusercontent.com/u/3965510?s=460&v=4"
          width="75px;"
          alt="TaeSang Cho"
        /><br /><sub><b>TaeSang Cho</b></sub></a
      ><br /><a
        href="https://github.com/iodes/TimeCat/commits?author=Web-Engine"
        title="Code"
        >💻</a
      ><a
        href="https://github.com/iodes/TimeCat/commits?author=Web-Engine"
        title="Review"
        >👀</a
      >
    </td>
    <td align="center">
      <a href="https://github.com/ejolie"
        ><img
          src="https://avatars3.githubusercontent.com/u/31282659?s=460&v=4"
          width="75px;"
          alt="Eunjeong Park"
        /><br /><sub><b>Eunjeong Park</b></sub></a
      ><br /><a
        href="https://github.com/iodes/TimeCat/commits?author=ejolie"
        title="Code"
        >💻</a
      >
      <a
        href="https://github.com/iodes/TimeCat/commits?author=ejolie"
        title="Documentation"
        >📖</a
      >
    </td>
    <td align="center">
      <a href="https://github.com/LiteHell"
        ><img
          src="https://avatars0.githubusercontent.com/u/12497886?s=400&v=4"
          width="75px;"
          alt="Yeonjin Shin"
        /><br /><sub><b>Yeonjin Shin</b></sub></a
      ><br /><a
        href="https://github.com/iodes/TimeCat/commits?author=LiteHell"
        title="Code"
        >💻</a
      >
    </td>
    <td align="center">
      <a href="https://github.com/khg0712"
        ><img
          src="https://avatars2.githubusercontent.com/u/25566139?s=460&v=4"
          width="75px;"
          alt="Click"
        /><br /><sub><b>Click</b></sub></a
      ><br /><a
        href="https://github.com/iodes/TimeCat/commits?author=kgh0712"
        title="Code"
        >💻</a
      >
    </td>
    <td align="center">
      <a href="https://github.com/Baek2back"
        ><img
          src="https://avatars1.githubusercontent.com/u/37530109?s=460&v=4"
          width="75px;"
          alt="Baek2back"
        /><br /><sub><b>김성백</b></sub></a
      ><br /><a
        href="https://github.com/iodes/TimeCat/commits?author=Baek2back"
        title="Code"
        >💻</a
      >
    </td>
  </tr>
</table>
<!-- ALL-CONTRIBUTORS-LIST:END -->

## Show your support

Give a ⭐️ if this project helped you!

## 📝 License

Copyright © 2019 [Kevin So](https://github.com/iodes).<br />
This project is [MIT](https://github.com/iodes/TimeCat/blob/master/LICENSE) licensed.

---

_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
