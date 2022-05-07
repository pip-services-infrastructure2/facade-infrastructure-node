import { Factory } from 'pip-services3-components-nodex';
import { Descriptor } from 'pip-services3-commons-nodex';

import { TestFacadeService } from './TestFacadeService';

export class TestFacadeFactory extends Factory {
	public static Descriptor = new Descriptor("facade-infrastructure", "factory", "default", "default", "1.0");

	public static TestServiceDescriptor = new Descriptor("facade-infrastructure", "service", "test", "*", "1.0");
	
	public constructor() {
		super();

		this.registerAsType(TestFacadeFactory.TestServiceDescriptor, TestFacadeService);
	}
	
}
