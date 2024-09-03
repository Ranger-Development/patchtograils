# ranger.dev/patchtograils

This npm package allows you to search for and replace Gradle dependencies in your project files. It is particularly useful for replacing deprecated or outdated dependencies with new ones.

## Installation

You can install the package globally using npm:

```bash
npm install -g "@ranger.dev/patchtograils"
```

## Usage
To use the package, you can run the following command:

```bash
patch-to-grails [options]
```
## Options
 - -d, --directory <path>: Specify the directory to search for Gradle files. If not specified, the 
                    current directory will be used.
 - -c, --current: Use the current working directory.
 - -s, --search <string>: The string to search for in the Gradle files. Defaults to jcenter().
 - -r, --replace <string>: The string to replace the search string with. 
        Defaults to maven { url 'https://repo.grails.org/grails/core/' }.

## Examples

Replace jcenter() with a new repository URL in the current directory:

```
patch-to-grails -c
```

## Contributing
Contributions are welcome! Please open an issue or submit a pull request on GitHub.

## License
This project is licensed under the MIT License.
