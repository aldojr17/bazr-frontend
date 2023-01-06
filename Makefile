run:
	yarn start

format:
	npx prettier --write --config .prettierrc.yml --no-editorconfig .

check-format:
	npx prettier --check --config .prettierrc.yml --no-editorconfig .

run-clean:
	rm -rf node_modules/ && yarn && yarn start
