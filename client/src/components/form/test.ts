validateRelationNumber(value: string, formControlName: ClientFormField) {
    if (value) {
        const regex = new RegExp(numberOnly);
        if (!regex.test(value)) {
            this.f[formControlName].setErrors({
                invalidValue: true,
                errorMessage: CLIENT_ERROR_MESSAGES.INVOICE_RELATION_ERROR2,
                value + CLIENT_ERROR_MESSAGES.INVOICE_RELATION_ERROR2,
            });
            return;
        }

        const rawData: any = { relationNo: value };
        const params = new URLSearchParams(rawData).toString();

        // Using mergeMap to chain the service calls
        this.commonService.validateRelationNumber(`?${params}`)
            .pipe(
                mergeMap(res => {
                    if (res) {
                        // If validateRelationNumber is successful, check if archived
                        return this.commonService.validateRelationArchived(`?${params}`);
                    } else {
                        // If validateRelationNumber failed, set errors and complete
                        this.f[formControlName].setErrors({
                            invalidValue: true,
                            errorMessage: CLIENT_ERROR_MESSAGES.NOT_VALID_CLIENT_RELATION_NUMBER_SECTION1,
                        });
                        return of(null); // Return an observable with null to terminate further operations
                    }
                }),
                takeUntil(this.destroy$)
            )
            .subscribe(
                archivedRes => {
                    if (archivedRes === false) {
                        this.f[formControlName].setErrors({
                            invalidValue: true,
                            errorMessage: CLIENT_ERROR_MESSAGES.NOT_VALID_RELATOR_NUMBERARCHIVED,
                        });
                    } else {
                        this.f[formControlName].setErrors(null);
                    }
                },
                error => {
                    // Handle errors here
                    console.error("Error occurred:", error);
                }
            );
    } else {
        this.f[formControlName].setErrors(null);
    }

    // Additional validation for specific form control names
    if (formControlName === ClientFormField.ClientBusinessPartner) {
        this.validateClientBusinessPartnerLessor(event);
    }
}
