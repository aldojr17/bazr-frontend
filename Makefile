run:
	npm run start

format:
	npx prettier --write --config .prettierrc.yml --no-editorconfig .

check-format:
	npx prettier --check --config .prettierrc.yml --no-editorconfig .
