import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';

const swaggerDocument = YAML.load('./src/__tests__/api/swagger.yaml');

export { swaggerDocument, swaggerUi };

