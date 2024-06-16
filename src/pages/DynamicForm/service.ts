import { getDynamicForm, runDynamicFormScript } from '@/webview/service';
import { Model } from './model';

export default class Service {
  private model: Model;

  constructor(model: Model) {
    this.model = model;
  }

  async getDynamicForm() {
    const res = await getDynamicForm();
    this.model.setSchema(res.schema);
    this.model.setScriptModal((s) => {
      s.scripts = res.scripts;
    });
  }

  async runScript(values: object) {
    this.model.setScriptModal((s) => {
      s.loading = true;
    });
    const res = await runDynamicFormScript({
      method: this.model.scriptModal.method!,
      params: this.model.scriptModal.params,
      model: values,
    }).finally(() => {
      this.model.setScriptModal((s) => {
        s.loading = false;
      });
    });
    return res;
  }
}
