# Contributing to GenKiKoi

First off, thank you for considering contributing to GenKiKoi! It's people like you that make GenKiKoi such a great tool.

## Code of Conduct

By participating in this project, you are expected to uphold our Code of Conduct. Please report unacceptable behavior to [maitanthepmrthep@gmail.com](mailto:maitanthepmrthep@gmail.com).

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the existing issues list as you might find out that you don't need to create one. When you are creating a bug report, please include as many details as possible:

* Use a clear and descriptive title
* Describe the exact steps which reproduce the problem
* Provide specific examples to demonstrate the steps
* Describe the behavior you observed after following the steps
* Explain which behavior you expected to see instead and why
* Include screenshots if possible

### Suggesting Enhancements

If you have a suggestion for the project, we'd love to hear about it. Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, please include:

* A clear and descriptive title
* A detailed description of the proposed enhancement
* Examples of how the enhancement would be used
* Any relevant screenshots or mockups

### Pull Requests

1. Fork the repo and create your branch from `main`.
2. If you've added code that should be tested, add tests.
3. If you've changed APIs, update the documentation.
4. Ensure the test suite passes.
5. Make sure your code lints.

### Development Process

1. Clone the repository
```bash
git clone https://github.com/yourusername/GenKiKoi.git
```

2. Create a new branch
```bash
git checkout -b feature/your-feature-name
```

3. Make your changes and commit them
```bash
git add .
git commit -m "Description of changes"
```

4. Push to your fork
```bash
git push origin feature/your-feature-name
```

5. Open a Pull Request

## Styleguides

### Git Commit Messages

* Use the present tense ("Add feature" not "Added feature")
* Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
* Limit the first line to 72 characters or less
* Reference issues and pull requests liberally after the first line

### JavaScript Styleguide

* Use 2 spaces for indentation
* Use semicolons
* Use single quotes
* No unused variables
* Space after keywords (if, for, while etc.)
* Space after function name
* Always use === instead of ==
* Add trailing commas
* Keep lines under 80 characters

### TypeScript Styleguide

* Follow the official TypeScript guidelines
* Use interfaces over types when possible
* Explicitly define return types for functions
* Use proper type annotations instead of `any`

### Documentation Styleguide

* Use [Markdown](https://guides.github.com/features/mastering-markdown/)
* Reference methods and classes in markdown using brackets, i.e. `[methodName]`
* Use code blocks for code examples

## Project Structure
```
GenKiKoi/
├── client/          # React frontend
├── server/          # Express backend
├── admin/           # Admin dashboard
└── shared/          # Shared utilities
```

## Testing

* Write test cases for new features
* Ensure all tests pass before submitting PR
* Follow existing test patterns

## Additional Notes

### Issue and Pull Request Labels

* `bug` - Something isn't working
* `enhancement` - New feature or request
* `documentation` - Improvements or additions to documentation
* `help-wanted` - Extra attention is needed
* `good-first-issue` - Good for newcomers

## Recognition

Contributors who help improve GenKiKoi will be recognized in our README.md file.

## Questions?

Don't hesitate to contact the project team if you have any questions. We're here to help!

---

Thank you for contributing to GenKiKoi! 🐟
