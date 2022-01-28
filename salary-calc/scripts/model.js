export const allowances = {
  basicSalary: 0,

  hra() {
    return this.basicSalary * 0.5;
  },

  da() {
    return this.basicSalary * 0.2;
  },

  ta() {
    return this.basicSalary * 0.3;
  },

  ma() {
    return this.basicSalary * 0.15;
  },

  pf() {
    return this.basicSalary * 0.05;
  },

  gs() {
    return this.basicSalary + this.hra() + this.da() + this.ma();
  },

  ns() {
    return this.gs() - this.pf();
  },
  
};
