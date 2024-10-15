import path from 'path';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';

const swaggerDocument = YAML.load(path.join(__dirname, '__tests__/api/swagger.yaml'));

export { swaggerDocument, swaggerUi };

